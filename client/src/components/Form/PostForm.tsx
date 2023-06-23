import { IFormObject, IInputObject, ITextAreaObject } from '../../types';
import { inputFactory } from '../../utils/inputFactory';
import { textAreaFactory } from '../../utils/textAreaFactory';
import { requiredRule } from '../../utils/validator';

export const postForm: IFormObject = {
  markdown: {
    ...textAreaFactory({
      name: 'markdown',
      placeholder: 'Enter Post Markdown',
    }),
    validationRules: [requiredRule('markdown')],
  } as ITextAreaObject,
  postTags: {
    ...inputFactory({
      label: 'Post Tags',
      name: 'postTags',
      type: 'text',
      placeholder: 'Enter Post Tags',
    }),
    validationRules: [requiredRule('postTags')],
  } as IInputObject,
};
