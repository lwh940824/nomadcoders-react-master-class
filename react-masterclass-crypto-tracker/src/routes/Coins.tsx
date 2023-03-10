import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {useSetRecoilState} from "recoil";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CoinsList = styled.ul`
    
`;
const Coin = styled.li`
    background-color: white;
    color: ${props => props.theme.textColor};
    border-radius: 15px;
    margin-bottom: 10px;
    a {
        display: flex;
        align-items: center;
        padding: 20px;
        transition: color 0.2s ease-in-out;
    } 
    &:hover {
        a {
            color: ${props => props.theme.accentColor}
        }
    }
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${props => props.theme.accentColor};
`; 

const Loader = styled.span`
    text-align: center;
    display: block;
`

const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`;

interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

function Coins() {
    const { isLoading, data } = useQuery<ICoin[]>(["allCoins"], fetchCoins);
    const setDarkAtom = useSetRecoilState(isDarkAtom);
    const toggleDarkAtom = () => {setDarkAtom((prev) =>!prev)}
    // const [coins, setCoins] = useState<ICoin[]>([]);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     (async () => {
    //         setCoins(json.slice(0, 100));
    //         setLoading(false);
    //     })();
    // }, []);

    return (
        <Container>
            <Helmet>
                <title>코인</title>
            </Helmet>
            <Header>
                <Title>코인</Title>
                <button onClick={toggleDarkAtom}>Toggle Mode</button> 
            </Header>
            {isLoading ? (
                    <Loader>Loading...</Loader>
                ) : (
                    <CoinsList>
                        {data?.slice(0, 100).map(coin => 
                            <Coin key={coin.id}>
                                <Link to={`/${coin.id}`} state={{name: coin.name,}}>
                                        <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} />
                                        {coin.name} &rarr;
                                </Link>
                            </Coin>)}
                    </CoinsList>)}
        </Container>
    );
}
export default Coins;