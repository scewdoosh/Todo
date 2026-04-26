function Home({ auth }) {
  return <h2>Welcome {auth.username}!</h2>;
}

export default Home;