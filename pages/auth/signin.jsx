import Layout from "../../components/Layout";

export default function SignIn() {
  return (
    <div data-theme="halloween">
    s
    </div>
  );
}

SignIn.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
}