import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signUp } = useAuth();



  const onSubmit = handleSubmit(async (values) => {
    signUp(values);
  });

  return (
    <div className="container container-register">
      <h1 className="text-center my-3 fs-4 fw-bold">REGISTER</h1>
      <form
        className="d-flex flex-column align-items-center"
        onSubmit={onSubmit}
      >
        <span>Username</span>
        <input
          type="text"
          placeholder="username"
          {...register("username", { required: true })}
        />
        {errors.username && <p className="text-danger">Username is required</p>}
        <span>email</span>
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        {errors.email && <p className="text-danger">Email is required</p>}
        <span>Password</span>
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        {errors.password && <p className="text-danger">Password is required</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
