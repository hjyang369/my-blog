# 1. About My Blog Project


## 1-1. 프로젝트 정보
- 개발기간: 2023.10.21 ~ 진행 중
- [My Blog의 배포 링크](https://my-blog-alpha-three.vercel.app/)
- [FrontEnd](https://github.com/hjyang369/my-blog) : 양회진
- [BackEnd](https://github.com/falsystack/myblog_backend) : 백엔드님
- FrontEnd의 기술 스택 : TypeScript, Next.js, html, tailwind CSS, Recoil
- 협업 툴 : git & github, trello, notion, VScode


## 1-2. 아키텍처
- 백엔드는 수정 중 입니다.
<img width="700" alt="스크린샷 2024-01-11 오후 4 42 53" src="https://github.com/hjyang369/my-blog/assets/125977702/570bbe4a-96c7-44ca-89d9-3f100e90f9ec">


# 2. 프로젝트의 핵심 기능
## PDF를 Firebase의 storage로 업로드 기능 구현 
(기존 백엔드 API에서 Firebase로 변경 중)

<img width="583" alt="스크린샷 2024-02-17 오후 3 43 21" src="https://github.com/hjyang369/my-blog/assets/125977702/fb95859c-8510-4aa6-a5aa-fcbb1dbb9466">



## Next.js 렌더링 방식에 대한 이해 및 페이지 역할에 따라 CSR과 SSR 적용

### 1) 블로그 글 리스트를 불러오는 메인 페이지 렌더링 시간 측정 (개발자 도구 이용,  단위 ms) 

<img width="612" alt="스크린샷 2024-02-15 오전 10 16 33" src="https://github.com/hjyang369/my-blog/assets/125977702/2dbe2e50-dfd4-4003-9aa9-07d8b88e3972">

- 초기 로딩 시간을 제외하고 CSR이 SSR보다 약 300% 이상 더 빨랐습니다.
- 최신 글 목록을 불러오고 유저가 글을 필터링, 무한 스크롤을 하는 등 수시로 동적인 업데이트가 필요한 환경이기 때문에 CSR이 더 적합하다고 판단했습니다.

### 2) CSR에서 캐싱을 사용하는 경우 (개발자 도구 이용)

- 동적인 업데이트가 자주 필요한 페이지라서 네트워크 통신시간을 줄일 필요성을 느꼈습니다.
- React Query의 캐싱으로 네트워크 통신시간을 감소시켜 전체 렌더링 시간을 단축했습니다.

| |캐싱 전|캐싱 후|
|:---:|:---:|:---:|
|측정 시간 (5회)|155/98/89/100/114 ms|134/0/0/0/0 ms|
|누적 통신시간|557 ms|134 ms (410%)|
|불러오는 파일 갯수|5개|0개|

- 첫번째에는 무조건 받아오기 때문에 134~155ms로 비슷한결과가 나왔습니다.
- 캐싱이 안되어있는 경우 필터링 적용 시 같은 결과더라도 5개의 파일을 불러왔고 캐싱이 되어있는 경우 불러오는 파일이 없었습니다.

### 3) 글 한개를 조회하는 상세페이지 렌더링 시간 측정 (개발자 도구 이용, 단위 ms) 

<img width="549" alt="스크린샷 2024-02-15 오전 10 26 28" src="https://github.com/hjyang369/my-blog/assets/125977702/7f7000ed-991a-41df-8b6d-a9d412d03252">


- SSR, SSG, ISR 시간을 비교해 본 결과 SSR이 제일 느렸습니다.
- SSG와 ISR이 정적페이지를 빠르게 렌더링을 시켜준 다는 점과 일정 시간 이후에는 업데이트를 적용 하기 위해 ISR로 적용하였습니다.
- ISR의 revalidate time은 1시간으로 자동 업데이트가 되도록 적용하였습니다.
 
## useIntersectionObserver 이용한 무한스크롤 구현
### 1) 전체 글 목록이 있는 main page의 pagination 방식에 대한 시퀀스 다이어그램
 메인 페이지는 무한 스크롤 기능은 useIntersectionObserver를 사용하여 observer가 뷰포트의 Intersection에 닿을 때마다 API를 호출하여 데이터를 가져옵니다.

<img width="800" alt="스크린샷 2024-01-11 오후 4 37 40" src="https://github.com/hjyang369/my-blog/assets/125977702/1db247ac-58dc-41f0-a754-1561956390bd">


### 2) 좋아요 한 글 목록이 있는 like page의 LocalStorage 방식에 대한 시퀀스 다이어그램
 좋아요 페이지는 Recoil의 persist를 활용하여 로컬 스토리지에 데이터를 저장한 데이터들을 보여줍니다. 좋아요 페이지의 첫 렌더링 시 데이터의 유무를 확인해 데이터가 존재하면 모든 데이터를 불러온 뒤, slice메서드를 사용하여 처음 10개의 데이터만 화면에 보여줍니다. 그 이후에는 Intersection Observer가 뷰포트와 교차할 때마다 추가로 불러온 데이터를 slice 메서드를 활용하여 화면에 추가로 보여줍니다.
 
<img width="800" alt="스크린샷 2024-01-11 오후 4 38 24" src="https://github.com/hjyang369/my-blog/assets/125977702/90aec00b-3e6c-476a-b275-2acb2f9cafa8">


## 필터링을 두가지 방식으로 구현
### 1) 전체 글 목록이 있는 main page의 Query String 방식에 대한 시퀀스 다이어그램
 메인 페이지에서는 사용자가 입력 필드의 값을 변경할 때마다 API를 호출하여 데이터를 가져와 필터링 기능을 구현합니다.


### 2) 좋아요 한 글 목록이 있는 like page의 LocalStorage 방식에 대한 시퀀스 다이어그램
 좋아요 페이지는 Recoil의 persist를 이용하여 로컬 스토리지에 저장한 데이터를 첫 렌더링 시에 데이터의 존재를 확인 후 모든 데이터를 불러옵니다. 그 후 입력 필드의 값이 변경될 때마다 첫 렌더링 시 불러온 데이터를 filter와 reverse 메서드를 활용하여 필터링하여 화면에 보여줍니다. 결과적으로 좋아요 페이지는 첫 렌더링 시 한 번 로컬 스토리지에 있는 데이터를 불러와 백엔드로 가는 부하를 줄였습니다.

<img width="800" alt="스크린샷 2024-01-11 오후 4 36 34" src="https://github.com/hjyang369/my-blog/assets/125977702/f23225a0-5f76-401b-b501-41697456a003">


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
