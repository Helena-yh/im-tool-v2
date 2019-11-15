// // function ltrim(s){
// //     return s.replace(/(^\s*)/g, "");
// // }

// function saveUserInfo(key,value){
//     localStorage.setItem("rong_user_" + key,value);
//   }

// function getUserInfo(){
//     let user = {};
//     let portrait = localStorage.getItem("rong_user_portrait");
//     if(!portrait){
//       portrait = Math.ceil(Math.random()*6);
//       saveUserInfo('portrait',portrait);
//     }
//     saveUserInfo('name',this.name);
//     user.id = this.userId;
//     user.portrait = '../assets/portrait/0' + portrait + '.jpg';
//     user.name = this.name;

//     return user;
//   }

// export default{
//     getUserInfo
// }