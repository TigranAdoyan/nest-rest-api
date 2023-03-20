import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import * as openai from 'openai';
import * as Types from './openai.types';
import { User } from '../../../providers/mysql/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OpenAiService {
  private readonly openaiClient: openai.OpenAIApi;

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {
    this.openaiClient = new openai.OpenAIApi(new openai.Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    }))
  }

  async Prompt(props: Types.PromptProps): Promise<Types.PromptResponse> {
    const response = await this.openaiClient.createCompletion({
      model: "text-davinci-003",
      prompt: props.text,
      temperature: 1,
    });
    
    return {
      answer: response.data.choices[0].text
    }
  }
}
