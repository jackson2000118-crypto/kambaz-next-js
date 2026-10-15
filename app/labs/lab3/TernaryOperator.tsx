export default function TernaryOperator() {
    
  let loggedIn = true;
  const hour = 9;
  // With AI
  const premium = false;

  return (
    <div id="wd-ternary-operator">
      <h4>Logged In</h4>

      {loggedIn ? <p>Welcome</p> : <p>Please login</p>}

      {/* On your own */}
      {hour < 12 ? <p>Good morning</p> : <p>Good afternoon</p>}

      {/* With AI */}
      {premium ? <p>Premium</p> : <p>Free</p>}

      <hr />
    </div>
  );
}