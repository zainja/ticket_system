const AuthHead = (token) => {
    return (
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
}
export default AuthHead