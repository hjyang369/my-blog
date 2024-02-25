//출시 전 서비스인 경우 경고문구 띄우는 함수
export const getReady = () => {
  alert("서비스가 준비 중 입니다.");
};

// 제목에서 키워드를 추출하는 함수
export const extractKeywordsFromTitle = (title) => {
  var keywords = [];
  // 공백을 기준으로 제목을 단어로 분리
  var words = title.split(" ");
  words.forEach(function (word) {
    // 한 글자 이상의 단어만 키워드로 취급
    if (word.length > 1) {
      // 키워드 배열에 없는 단어만 추가
      if (!keywords.includes(word)) {
        keywords.push(word);
      }
      // 단어의 부분 문자열도 키워드로 추가
      for (var i = 1; i < word.length; i++) {
        var subWord = word.substring(0, i);
        if (!keywords.includes(subWord)) {
          keywords.push(subWord);
        }
      }
      // 한글자인 경우 바로 넣어줌 // TODO 나중에 이게 정말 필요한지 고민해볼것
    } else if (word.length === 1) {
      keywords.push(word);
    }
  });
  return keywords;
};

// 2024-01-10 형식의 날짜를 date 형식으로 바꿔주는 함수
export const calculateTime = (date: string, isStart: boolean) => {
  // 현재 날짜, 시간인 경우 date가 null이기때문에 따로 적용
  const typeofDate = date ? new Date(date) : new Date();

  // 00:00인 경우
  if (isStart) {
    return new Date(
      typeofDate.getFullYear(),
      typeofDate.getMonth(),
      typeofDate.getDate()
    );
    // 23:59인 경우
  } else {
    return new Date(
      typeofDate.getFullYear(),
      typeofDate.getMonth(),
      typeofDate.getDate(),
      23,
      59,
      59
    );
  }
};
