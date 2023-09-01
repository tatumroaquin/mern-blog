import {
  IFormObject,
  IInputObject,
  ITextAreaObject,
  ISelectObject,
} from '../../types';
import { inputFactory } from '../../utility/inputFactory';
import { selectFactory } from '../../utility/selectFactory';
import { textAreaFactory } from '../../utility/textAreaFactory';
import { requiredRule } from '../../utility/validator';

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
