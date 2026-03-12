"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
exports.hashPasswordFunc = hashPasswordFunc;
exports.comparePassword = comparePassword;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt_1 = __importDefault(require("bcrypt"));
async function hashPasswordFunc(password) {
    try {
        const salt = await bcrypt_1.default.genSalt();
        return await bcrypt_1.default.hash(password, salt);
    }
    catch (error) {
        throw error;
    }
}
async function comparePassword(userPassword, passwordHash) {
    try {
        const result = await bcrypt_1.default.compare(userPassword, passwordHash);
        return result;
    }
    catch (error) {
        throw error;
    }
}
let UserService = UserService_1 = class UserService {
    userRepository;
    logger = new common_1.Logger(UserService_1.name);
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async validateAndCreateUser(createUserDto) {
        const { name, email, password } = createUserDto;
        try {
            const existing = await this.userRepository.findOne({
                where: {
                    email: email
                }
            });
            if (existing) {
                throw new common_1.ConflictException("This email is already registered");
            }
            if (password) {
                const hashPassword = await hashPasswordFunc(password);
                const user = {
                    name: name,
                    email: email,
                    password: hashPassword,
                };
                const entity = this.userRepository.create(user);
                await this.userRepository.save(entity);
                return "User created succesfully";
            }
            else {
                throw new common_1.BadRequestException(`Password is required to create user`);
            }
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException || error instanceof common_1.ConflictException) {
                throw error;
            }
            this.logger.log(`Unknow error: ${error}`);
            throw new common_1.ServiceUnavailableException("Failed to create user");
        }
    }
    async findByEmailWithPassword(email) {
        return await this.userRepository.findOne({ where: { email: email }, select: ['id', 'name', 'email', 'password'] });
    }
    async findById(id) {
        return await this.userRepository.findOne({ where: { id: id }, select: ['id', 'name', 'email', 'password'] });
    }
    async updateUser(userId, data) {
        const currentUser = await this.userRepository.findOne({ where: { id: userId } });
        if (!currentUser) {
            throw new common_1.BadRequestException("User not found");
        }
        const updateData = {};
        if (data.name !== undefined) {
            updateData.name = data.name;
        }
        if (data.email !== undefined) {
            const existing = await this.userRepository.findOne({ where: { email: data.email } });
            if (existing && existing.id !== userId) {
                throw new common_1.ConflictException("This email is already registered");
            }
            updateData.email = data.email;
        }
        if (data.password !== undefined) {
            updateData.password = await hashPasswordFunc(data.password);
        }
        if (Object.keys(updateData).length === 0) {
            throw new common_1.BadRequestException("No fields provided for update");
        }
        await this.userRepository.update({ id: userId }, updateData);
        return this.userRepository.findOne({
            where: { id: userId },
            select: ["id", "name", "email"]
        });
    }
    async deleteUser(userId, targetId) {
        if (userId === targetId) {
            throw new common_1.BadRequestException("A user cannot delete itself via this path");
        }
        const targetUser = await this.userRepository.findOne({ where: { id: targetId }, select: ["id", "name", "email"] });
        await this.userRepository.delete({ id: targetId });
        return `User deleted from database:\n- Id: ${targetUser?.id}\n- Name: ${targetUser?.name}\n- Email: ${targetUser?.email}`;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map