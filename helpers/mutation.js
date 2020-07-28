import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
muatation loginUser($username:String!,$password:String!){
    user(username:$username,password:$password){
        name,
        status,
        message,
        semester,
        attendance{
            subject,
            subCode,
            percentage,
            theo,
            prac
        }
    }
}
`