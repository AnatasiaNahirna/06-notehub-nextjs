'use client';

const Error  = (error: Error) => {
  return (
    <div style={{ padding: "15px", textAlign: "center" }}>
      <p>  There is an error. Please, try again. {error.message}</p>
      </div>
  );
}

export default Error;

