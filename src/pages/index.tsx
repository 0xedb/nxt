import * as React from "react";

type TStaticInfo = {
  name: string;
  age: number;
};

const Channel = "bc";

function Home( ) {
  const [m, setM] = React.useState("");
  const bc = React.useRef<BroadcastChannel | null>(null);

  const handleBc = () => {
    bc.current!.postMessage(Date.now());

    // console.log('clicking', bc === bc)
  };

  React.useEffect(() => {
    bc.current = new BroadcastChannel(Channel);
    handleBc()
  }, []);

  React.useEffect(() => {
    bc.current?.addEventListener("message", (data) => {
      console.log(data.data)
      setM(data.data);
    });
  }, [bc]);

  return (
    <> 
      <h1>--[{m}]--</h1>
      <button type="button" onClick={handleBc}>
        Start Messaging
      </button>
    </>
  );
}

// export async function getStaticProps() {
//   return {
//     props: {
//       info: {
//         age: 0xedb,
//         name: "meeee!",
//       },
//     },
//   };
// }

export default Home;
