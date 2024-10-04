import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, useAccount, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  goerli,
  polygonMumbai,
  optimismGoerli,
  arbitrumGoerli,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import MainLayout from "../layout/mainLayout";
import { useRouter } from "next/router";

const { chains, provider } = configureChains(
  [
    mainnet,
    goerli,
    polygon,
    polygonMumbai,
    optimism,
    optimismGoerli,
    arbitrum,
    arbitrumGoerli,
  ],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My Alchemy DApp",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export { WagmiConfig, RainbowKitProvider };

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const account = useAccount({
    onConnect({ address, connector, isReconnected }) {
      if (!isReconnected) router.reload();
    },
  });
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        modalSize="compact"
        initialChain={process.env.NEXT_PUBLIC_DEFAULT_CHAIN}
        chains={chains}
      >
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;# Gambling Website Source Code

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gambling Website</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Welcome to Our Gambling Platform</h1>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#games">Games</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section id="home">
            <h2>Home</h2>
            <p>Experience the thrill of gambling with our unique game modes!</p>
        </section>

        <section id="games">
            <h2>Our Games</h2>
            <div class="game" id="coin-flip">
                <h3>Coin Flip</h3>
                <button onclick="playCoinFlip()">Flip Coin</button>
                <p id="coin-flip-result"></p>
            </div>
            <div class="game" id="dice-roll">
                <h3>Dice Roll</h3>
                <button onclick="playDiceRoll()">Roll Dice</button>
                <p id="dice-roll-result"></p>
            </div>
        </section>

        <section id="about">
            <h2>About Us</h2>
            <p>We are dedicated to providing a safe and enjoyable gambling experience.</p>
        </section>

        <section id="contact">
            <h2>Contact Us</h2>
            <p>Email: support@gamblingwebsite.com</p>
        </section>
    </main>

    <footer>
        <p>&copy; 2023 Gambling Website. All rights reserved.</p>
    </footer>

    <script>
        function playCoinFlip() {
            const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
            document.getElementById('coin-flip-result').innerText = `Result: ${result}`;
        }

        function playDiceRoll() {
            const result = Math.floor(Math.random() * 6) + 1;
            document.getElementById('dice-roll-result').innerText = `Result: ${result}`;
        }
    </script>
</body>
</html>


