# 1. About My Blog Project

## 1-1. 프로젝트 정보
- 개발기간: 2023.10.21 ~ 진행 중
- [My Blog의 배포 링크](https://www.youtube.com/watch?v=rx7zdgdbR0s)
- [FrontEnd](https://github.com/hjyang369/my-blog) : 양회진
- [BackEnd](https://github.com/falsystack/myblog_backend) : 백엔드님
- FrontEnd의 기술 스택 : TypeScript, Next.js, html, tailwind CSS, Recoil
- 협업 툴 : git & github, trello, notion, VScode

## 1-2. 아키텍처
- 백엔드는 수정 중 입니다.
<img width="700" alt="스크린샷 2024-01-11 오후 4 42 53" src="https://github.com/hjyang369/my-blog/assets/125977702/32b45166-ea4a-46e5-af45-3832c88b837c">


# 2. 프로젝트의 핵심 기능
## 이력서 PDF를 formdata로 post API로 업로드 기능 구현
① 파일 또는 URL에 따라 로딩 태스크를 만들고, 파일, URL이 아닌 타입의 경우에는 오류가 발생합니다.
   - 파일의 경우 FileReader를 사용하여 파일 데이터를 배열 버퍼로 읽고, 읽기가 완료되면 배열 버퍼를 사용하여 로딩 태스크 객체를 생성합니다.
   - URL의 경우 URL을 사용하여 직접 로딩 태스크 객체를 생성합니다.
② 만들어진 로딩 태스크에서 PDF를 가져와 useRef의 참조 내부에 PDF 문서의 인스턴스를 저장하고, 이를 사용하여 각 페이지를 렌더링합니다.
   - 각 페이지를 렌더링할 때는 캔버스를 생성하고, 스타일 및 뷰포트를 설정한 후, 이를 useRef에 설정된 div에 추가합니다.
③ 컴포넌트가 마운트될 때 렌더링 함수를 호출하고, 컴포넌트가 언마운트될 때 메모리 누수를 방지하기 위해 제거 작업이 수행됩니다.

## Next.js 렌더링 방식에 대한 이해 및 CSR과 SSR 비교

|비교 사항|CSR|SSR|
|:---:|:---:|:---:|
|DOM 로딩 시간|48ms|210ms|
|페이지 이동 시 로딩 시간|51ms|177ms|
|초기 로딩 시간|107ms|79ms|

 동일한 페이지를 CSR/SSR로 구현을 해본 결과 초기 로딩 시간을 제외하고 CSR이 SSR보다 약 300% 이상 더 빨랐습니다. 이 프로젝트는 최신글 목록과 댓글이 실시간으로 반영이 되어 페이지 변경이 잦고 유저가 글을 검색하거나 필터링을 하는 등 동적인 업데이트가 많은 환경이기때문에 CSR이 더 적합하다고 판단했습니다.
 
## useIntersectionObserver 이용한 무한스크롤 구현
### 1) 전체 글 목록이 있는 main page의 pagination 방식에 대한 시퀀스 다이어그램
 메인 페이지는 무한 스크롤 기능은 useIntersectionObserver를 사용하여 observer가 뷰포트의 Intersection에 닿을 때마다 API를 호출하여 데이터를 가져옵니다.

<img width="800" alt="스크린샷 2024-01-11 오후 4 37 40" src="https://github.com/hjyang369/my-blog/assets/125977702/1db247ac-58dc-41f0-a754-1561956390bd">




### 2) 좋아요 한 글 목록이 있는 like page의 LocalStorage 방식에 대한 시퀀스 다이어그램
 좋아요 페이지는 Recoil의 persist를 활용하여 로컬 스토리지에 데이터를 저장한 데이터들을 보여줍니다. 좋아요 페이지의 첫 렌더링 시 데이터의 유무를 확인해 데이터가 존재하면 모든 데이터를 불러온 뒤, slice메서드를 사용하여 처음 10개의 데이터만 화면에 보여줍니다. 그 이후에는 Intersection Observer가 뷰포트와 교차할 때마다 추가로 불러온 데이터를 slice 메서드를 활용하여 화면에 추가로 보여줍니다.
 
<img width="900" alt="스크린샷 2024-01-11 오후 4 38 24" src="https://github.com/hjyang369/my-blog/assets/125977702/90aec00b-3e6c-476a-b275-2acb2f9cafa8">


## 필터링을 두가지 방식으로 구현
### 1) 전체 글 목록이 있는 main page의 Query String 방식에 대한 시퀀스 다이어그램
 메인 페이지에서는 사용자가 입력 필드의 값을 변경할 때마다 API를 호출하여 데이터를 가져와 필터링 기능을 구현합니다.

### 2) 좋아요 한 글 목록이 있는 like page의 LocalStorage 방식에 대한 시퀀스 다이어그램
 좋아요 페이지는 Recoil의 persist를 이용하여 로컬 스토리지에 저장한 데이터를 첫 렌더링 시에 데이터의 존재를 확인 후 모든 데이터를 불러옵니다. 그 후 입력 필드의 값이 변경될 때마다 첫 렌더링 시 불러온 데이터를 filter와 reverse 메서드를 활용하여 필터링하여 화면에 보여줍니다. 결과적으로 좋아요 페이지는 첫 렌더링 시 한 번 로컬 스토리지에 있는 데이터를 불러와 백엔드로 가는 부하를 줄였습니다.

<img width="555" alt="스크린샷 2024-01-11 오후 4 36 34" src="https://github.com/hjyang369/my-blog/assets/125977702/f23225a0-5f76-401b-b501-41697456a003">


# 3. 내가 맡은 역할

### 메인 페이지 (블로그 글 전체 목록 페이지)
- 레이아웃
- API 통신을 이용한 무한스크롤
- API 통신을 이용한 필터링

### 상세 페이지 (블로그 글 한개에 대한 페이지)
- 레이아웃
- 글 수정/삭제 기능

### 수정페이지 (내가 쓴 글 수정 페이지)
- 레이아웃
- 기존의 글을 기준으로 수정 기능

### 작성 페이지 (글 작성 페이지)
- 레이아웃
- 유저가 입력한 내용을 post 요청

### 좋아요 페이지 (좋아요한 글 목록 페이지)
- 레이아웃
- LocalStorage 이용한 무한스크롤
- filter, reverse 메서드 이용한 필터링

### 이력서 페이지 (이력서 페이지)
- 레이아웃
- 이력서 PDF 미리보기 기능


# 4. 추가 구현 예정인 기능
- [ ] 로그인/회원가입을 통한 유저관리
- [ ] 다국어 지원 (한국어, 일본어)
- [ ] 내가 쓴 글만 보는 페이지
- [ ] 회원/비회원 댓글 기능

# 5. 참고자료
- [My Blog의 API 명세서](https://falsystack.jp/docs/post.html)
- [My Blog의 Trello](https://trello.com/b/IQ5X22K7/my-blog)
