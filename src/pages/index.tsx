import * as React from "react";

type TStaticInfo = {
  name: string;
  age: number;
};

const Channel = "bc";

function Home() {
  const [s, setS] = React.useState(true);
  const [m, setM] = React.useState<Date>(new Date());
  const bc = React.useRef<BroadcastChannel | null>(null);

  const handleBc = () => {
    // console.log('clicking', bc === bc)
    setS((prev) => !prev);

    setInterval(() => {
      s && bc.current!.postMessage(new Date());
    }, 200);
  };

  React.useEffect(() => {
    bc.current = new BroadcastChannel(Channel);
    handleBc();
  }, []);

  React.useEffect(() => {
    bc.current?.addEventListener("message", (data) => {
      console.log(data.data);
      setM(data.data);
    });
  }, [bc]);

  return (
    <>
      <h1>
        --[{m?.getHours()}:{m?.getMinutes()}:{m?.getSeconds()}]--
      </h1>
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
