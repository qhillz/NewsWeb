/* 액션 타입 만들기 */
// **Ducks 패턴**을 따를땐 액션의 이름에 접두사를 넣어주세요.
// 이렇게 하면 다른 모듈과 액션 이름이 중복되는 것을 방지 할 수 있습니다.
type CategoryAction = ReturnType<typeof setCategory>
// 이 리덕스 모듈에서 관리 할 상태의 타입을 선언합니다
export type CategoryState = {
  category: string;
};

const SET_DIFF = 'category/SET_DIFF';
/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보내주세요.
export const setCategory = (diff : string) => ({ type: SET_DIFF, diff });

/* 초기 상태 선언 */
const initialState: CategoryState = {
  category: "general"
};

/* 리듀서 선언 */
// 리듀서는 export default 로 내보내주세요.
export default function category(state: CategoryState = initialState, action: CategoryAction) : CategoryState {
  switch (action.type) {
    case SET_DIFF:
      return {
        ...state,
        category: action.diff
      };
    default:
      return state;
  }
}