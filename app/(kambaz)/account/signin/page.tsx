import Link from "next/link";
export default function Signin() {
  return (
    <div id="wd-signin-screen">
      <h3>Sign in</h3>
      {/* Account：if no type, defult is text*/}
      <input
        placeholder="username"
        className="wd-username"
        defaultValue="ada"
      />{" "}
      <br />

      {/* Password */}
      <input
        placeholder="password"
        type="password"
        className="wd-password"
        defaultValue="123"
      />{" "}
      <br />

      <input
        placeholder="verify password"
        type="password"
        className="wd-password-verify"
      />
      <br />
      
      {/*  Sign in, and go to personal page */}
      <Link href="/account/profile" id="wd-signin-btn">
        Sign in
      </Link>{" "}
      <br />

      {/*  Sign up, to the Sign up page */}
      <Link href="/account/signup" id="wd-signup-link">
        Sign up
      </Link>
    </div>
  );
}