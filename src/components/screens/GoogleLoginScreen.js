// // GoogleLoginScreen.js
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { Row, Col, Button } from "react-bootstrap";
// import { GoogleLogin } from "react-google-login";
// import { loginWithGoogle } from "../../actions/userActions"; 

// function GoogleLoginScreen() {
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();
//   const history = useHistory();

//   const userLogin = useSelector((state) => state.userLogin);
//   const { error, userInfo } = userLogin;

//   useEffect(() => {
//     if (userInfo) {
//       history.push("/");
//     }
//   }, [userInfo, history]);

//   const responseGoogle = (response) => {
//     if (response.profileObj) {
//       setLoading(true);
//       const { email, googleId, tokenId } = response.profileObj;
//       dispatch(loginWithGoogle(email, googleId, tokenId)); 
//     }
//   };

//   return (
//     <div>
//       <Row className="py-3">
//         <Col className="text-center ">
//           <GoogleLogin
//             clientId="551868905468-afspiie229k0936gn1i5ipj8b4s9dmk5.apps.googleusercontent.com"
//             onSuccess={responseGoogle}
//             onFailure={responseGoogle}
//             render={(renderProps) => (
//               <Button
//                 variant="danger"
//                 block
//                 className="google-login-button rounded w-100"
//                 onClick={renderProps.onClick}
//                 disabled={renderProps.disabled}
//                 cookiePolicy={"single_host_origin"}
//               >
//                 <i className="fab fa-google"></i> Login with Google
//               </Button>
//             )}
//           />
//         </Col>
//       </Row>

//       {error && <div>{error}</div>}
//       {loading && <div>Loading...</div>}
//     </div>
//   );
// }

// export default GoogleLoginScreen;
