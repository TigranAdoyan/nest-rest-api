import { User } from '../../../providers/mysql/entities/user.entity';

export type PromptProps = {
  text: string;
}

export type PromptResponse = {
  answer: string;
}