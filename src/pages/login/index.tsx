import { useSetRecoilState } from "recoil";
import IC_Lock from "../../../public/icon/Lock";
import IC_User from "../../../public/icon/User";
import BlackButton from "../../components/common/blackButton";
import ClickButton from "../../components/common/clickButton";
import Input from "../../components/common/input";
import Logo from "../../components/common/logo";
import useInputValue from "../../hooks/useInputValue";
import useMoveToPage from "../../hooks/useMovetoPage";
import { getReady } from "../../modules/function";
import { loginUserEmail } from "../api/auth";
import { userState } from "../../store/userStore";
import { userType } from "../../types/user";

const initInputValue = {
  email: "",
  password: "",
};

const LOGIN_INPUT_DATA = [
  { id: 1, name: "email", type: "text", icon: <IC_User /> },
  { id: 2, name: "password", type: "password", icon: <IC_Lock /> },
];

export default function Login() {
  const { inputValue, handleInput } = useInputValue(initInputValue);
  const { moveToPage } = useMoveToPage();
  const setUser = useSetRecoilState(userState);

  const loginUser = async (email, password) => {
    const user = await loginUserEmail(email, password);
    setUser(user as userType);
    moveToPage("/");
  };

  const LOGIN_BUTTON_DATA = [
    { id: 1, text: "아이디 찾기", func: getReady },
    { id: 2, text: "비밀번호 찾기", func: getReady },
    { id: 3, text: "회원가입", func: () => moveToPage("/signup") },
  ];

  const LOGIN_TYPE_DATA = [
    {
      id: 1,
      text: "로그인",
      func: () => loginUser(inputValue.email, inputValue.password),
    },
    { id: 2, text: "카카오 로그인", func: getReady },
  ];

  return (
    <div className="mt-52 flex flex-col justify-center items-center gap-16">
      <div className="mb-10">
        <Logo text="MY BLOG" subText="- login -" />
      </div>
      <div className="flex flex-col gap-4">
        {LOGIN_INPUT_DATA.map(({ id, name, type, icon }) => {
          return (
            <div key={id} className="relative flex flex-col gap-4">
              <Input
                handleInput={handleInput}
                name={name}
                type={type}
                width={"w-96"}
              ></Input>
              <div className="absolute top-3 left-3">{icon}</div>
            </div>
          );
        })}

        <div className="flex gap-2">
          <input type="checkbox"></input>
          <span className="text-lg">아이디 저장</span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {LOGIN_TYPE_DATA.map(({ id, text, func }) => {
          return (
            <div key={id}>
              <ClickButton
                text={text}
                fontSize={"1.2rem"}
                onclick={func}
                width={"24rem"}
              ></ClickButton>
            </div>
          );
        })}
      </div>

      <div className="flex gap-6">
        {LOGIN_BUTTON_DATA.map(({ id, text, func }) => {
          return (
            <div key={id} className="flex gap-6">
              {id > 1 && <span>|</span>}
              <BlackButton text={text} onclick={func}></BlackButton>
            </div>
          );
        })}
      </div>
    </div>
  );
}
