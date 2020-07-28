import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
query loginUser($username:String!,$password:String!){
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
export const BOOKS_QUERY = gql`
{
    books{
      name,
      author,
      thumb,
      url,
      subCode,
      semesters
    }
}`