 
const ForgetPasswordPage = async({params}:{params:{courseId:string}}) => {
    try {
        
   

    // as soon as the page loads we wanna make a  request getting the id and posting it to backend api and 
    // we show succes and err base on the response we get and ofter the response we redirect user to a page that he can chenge the password  and ofter that tp login page
    // or telling him that now he can login 
    // ofter sending the request and the response we have to decide to not letting user stay in this page
  return (
    <div>
        forgetpasswordform 



        <div className="">
            if the response is sucess we redirect to password enter page or open adn modal for that 
        </div>
        <div className="">
if its failed e say the token is incalid or he can  try again         </div>
    </div>
  )
} catch (error) {
        
}
}

export default ForgetPasswordPage