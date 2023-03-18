import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import Redis from 'ioredis';

@Injectable()
export class AuthRedisProvider {
  private readonly client: Redis;

  constructor() {
    this.client = new Redis(process.env.AUTH_REDIS_URL);
  }

  set(key: string, value: any) {
    return new Promise((resolve, reject) => {
      this.client.set(key, JSON.stringify(value), (err: Error) => {
        if (err) reject(new HttpException("", HttpStatus.BAD_REQUEST));
        resolve(undefined);
      })
    })
  }

  get<T>(key: string) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err: Error, value: any) => {
        if (err) reject(new HttpException("", HttpStatus.BAD_REQUEST));
        resolve(value ? JSON.parse(value) as T : null);
      })
    })
  }

  del(key: string) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err: Error) => {
        if (err) reject(new HttpException("", HttpStatus.BAD_REQUEST));
        resolve(undefined);
      })
    })
  }
}
