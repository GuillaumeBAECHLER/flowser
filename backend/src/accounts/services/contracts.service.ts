import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContractDto } from '../dto/create-contract.dto';
import { UpdateContractDto } from '../dto/update-contract.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";
import { Account } from "../entities/account.entity";
import { AccountContract } from "../entities/contract.entity";
import { exec } from 'child_process';
import { toArray } from 'rxjs';
import { ObjectLiteral } from "typeorm/common/ObjectLiteral";

@Injectable()
export class ContractsService {

    constructor(
        @InjectRepository(Account)
        private accountRepository: MongoRepository<Account>
    ) {
    }

    create(createContractDto: CreateContractDto) {
        return this.accountRepository.save(createContractDto);
    }

    async findAll() {
        return this._findAll();
    }

    async findAllNewerThanTimestamp(timestamp): Promise<AccountContract[]> {
        return this._findAll([
            {$match: {'createdAt': {$gt: timestamp}}},
        ])
    }

    async findOne(id: string) {
        const [contract] = await this._findAll([
            {$match: {'_id': {$eq: id}}}
        ])
        if (contract) {
            return contract;
        } else {
            throw new NotFoundException("Contract not found")
        }
    }

    update(id: string, updateContractDto: UpdateContractDto) {
        return `This action updates a #${id} contract`;
    }

    remove(id: string) {
        return `This action removes a #${id} contract`;
    }

    async _findAll(pipeline: ObjectLiteral[] = []) {
        return this.accountRepository.aggregate([
            {
                $project: {
                    address: 1,
                    contracts: {
                        $map: {
                            input: "$contracts",
                            as: "contract",
                            in: {
                                "$mergeObjects": [
                                    "$$contract",
                                    {accountAddress: "$address"}
                                ]
                            }
                        }
                    }
                }
            },
            {$unwind: "$contracts"},
            {$replaceRoot: {newRoot: "$contracts"}},
            ...pipeline
        ]).toArray()
    }
}