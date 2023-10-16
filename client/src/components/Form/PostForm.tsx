import {
  IFormObject,
  IInputObject,
  ITextAreaObject,
  ISelectObject,
} from '@types';
import { inputFactory } from '@util/inputFactory';
import { selectFactory } from '@util/selectFactory';
import { textAreaFactory } from '@util/textAreaFactory';
import { requiredRule } from '@util/validator';

export const postForm: IFormObject = {
  markdown: {
    ...textAreaFactory({
      name: 'markdown',
      placeholder: 'Enter Post Markdown',
    }),
    validationRules: [requiredRule('markdown')],
  } as ITextAreaObject,
  description: inputFactory({
    label: 'Description',
    name: 'description',
  }) as IInputObject,
  postTags: selectFactory({
    label: 'Post Tags',
    name: 'postTags',
  }) as ISelectObject,
};
