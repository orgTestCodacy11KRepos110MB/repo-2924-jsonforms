import { ThunkAction } from 'redux-thunk';
import { getData } from '../reducers/index';
import { RankedTester } from '../testers';
import { Renderer } from '../renderers';
import { JsonSchema, UISchemaElement } from '../';
import { generateDefaultUISchema, generateJsonSchema } from '../generators';

const NAMESPACE = 'jsonforms';

export const INIT = `${NAMESPACE}/INIT`;
export const UPDATE_DATA = `${NAMESPACE}/UPDATE`;
export const VALIDATE = `${NAMESPACE}/VALIDATE`;
export const ADD_RENDERER = `${NAMESPACE}/ADD_RENDERER`;
export const REMOVE_RENDERER = `${NAMESPACE}/REMOVE_RENDERER`;
export const ADD_FIELD = `${NAMESPACE}/ADD_FIELD`;
export const REMOVE_FIELD = `${NAMESPACE}/REMOVE_FIELD`;

export const init = (
  data: any,
  schema: JsonSchema = generateJsonSchema(data),
  uischema: UISchemaElement = generateDefaultUISchema(schema)
) =>
    ({
      type: INIT,
      data,
      schema,
      uischema
    });

// TODO: fix typings
export const update =
  (path: string, updater: (any) => any): ThunkAction<void, any, void> =>
    (dispatch, getState) => {
      dispatch(
        {
          type: UPDATE_DATA,
          path,
          updater
        }
      );
      dispatch(
        {
          type: VALIDATE,
          data: getData(getState())
        }
      );
    };

export const validate = () => (dispatch, getState) => {
  dispatch({
    type: VALIDATE,
    data: getData(getState())
  });
};

export const registerRenderer = (
  tester: RankedTester,
  renderer: Renderer
) => ({
  type: ADD_RENDERER,
  tester,
  renderer
});

export const unregisterRenderer = (
  tester: RankedTester,
  renderer: Renderer
) => ({
  type: REMOVE_RENDERER,
  tester,
  renderer
});
