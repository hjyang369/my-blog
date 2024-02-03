import IC_Lock from "../../../public/icon/Lock";
import IC_Mail from "../../../public/icon/Mail";
import IC_User from "../../../public/icon/User";
import ClickButton from "../../components/common/clickButton";
import Input from "../../components/common/input";
import Logo from "../../components/common/logo";
import useInputValue from "../../hooks/useInputValue";
import useMoveToPage from "../../hooks/useMovetoPage";
import { createUser, createUserDoc, emailVerification } from "../api/auth";

const initInputValue = {
  nickname: "",
  password: "",
  checkPassword: "",
  email: "",
};

export default function Login() {
  const { inputValue, handleInput } = useInputValue(initInputValue);

  const { moveToPage } = useMoveToPage();

  const postUserData = () => {
    createUser(inputValue.email, inputValue.password)
      .then((res) => {
        console.log("create res", res);
        const { user }: any = res;
        emailVerification();
        createUserDoc({
          uid: user.uid,
          email: user.email,
          nickname: inputValue.nickname,
        })
          .then((res) => {
            moveToPage("/login");
            console.log("user Create", res);
          })
          .catch((err) => {
            console.log("user create error", err);
          });
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const nicknameExp = /^[a-z]+[a-z0-9]{5,19}$/g;
  const passwordExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;
  const emailExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  const checkNickname = nicknameExp.test(inputValue.nickname);
  const checkPassword = passwordExp.test(inputValue.password);
  const doubleCheckPassword = inputValue.password === inputValue.checkPassword;
  const checkEmail = emailExp.test(inputValue.email);

  const SIGN_UP_INPUT_DATA = [
    {
      id: 1,
      name: "nickname",
      type: "text",
      icon: <IC_User />,
      warning: " 아이디: 6~20자의 영문자, 숫자를 사용해 주세요.",
      valid: checkNickname,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      icon: <IC_Lock />,
      warning: "비밀번호: 8~16자의 영문 대/소문자, 숫자를 사용해 주세요.",
      valid: checkPassword,
    },
    {
      id: 3,
      name: "checkPassword",
      type: "password",
      icon: <IC_Lock />,
      warning: "비밀번호와 동일하게 작성해 주세요.",
      valid: doubleCheckPassword,
    },
    {
      id: 4,
      name: "email",
      type: "text",
      icon: <IC_Mail />,
      warning: "이메일: 이메일 주소가 정확한지 확인해 주세요.",
      valid: checkEmail,
    },
  ];

  return (
    <div className="mt-52 flex flex-col justify-center items-center gap-16">
      <div className="mb-10">
        <Logo text="MY BLOG" subText="- sign up -" />
      </div>
      <div className="flex flex-col items-center gap-2">
        {SIGN_UP_INPUT_DATA.map(({ id, name, type, icon, warning, valid }) => {
          const isMail = name === "email" ? "top-3.5 left-3.5" : "top-3 left-3";
          return (
            <div key={id} className="relative flex flex-col gap-1 h-28">
              <Input
                handleInput={handleInput}
                name={name}
                type={type}
                width={"w-width33"}
              ></Input>
              <div className={`absolute ${isMail}`}>{icon}</div>
              {!valid && inputValue[name].length > 0 && (
                <span className={`text-red-500 p-2`}>{warning}</span>
              )}
            </div>
          );
        })}
      </div>

      <ClickButton
        text={"회원가입"}
        fontSize={"1.7rem"}
        onclick={postUserData}
        width={"33rem"}
        height={"4.5rem"}
      ></ClickButton>
    </div>
  );
}
