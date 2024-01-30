import { useContext } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Token, TokenAmount, WETH } from '@intercroneswap/v2-sdk';

import { AutoColumn } from '../Column';
import { ButtonSecondary } from '../Button';
import { RowBetween, RowFixed } from '../Row';
import { FixedHeightRow, HoverCard } from './index';
import DoubleCurrencyLogo from '../DoubleLogo';
import { useActiveWeb3React } from '../../hooks';
import { ThemeContext } from 'styled-components';
import { TYPE } from '../../theme';

// eslint-disable-next-line @typescript-eslint/ban-types
interface PositionCardProps extends RouteComponentProps<{}> {
  token: Token;
  VLiquidityBalance: TokenAmount;
}

function VPositionCard({ token, VLiquidityBalance }: PositionCardProps) {
  const theme = useContext(ThemeContext);

  const { chainId } = useActiveWeb3React();

  return (
    <HoverCard>
      <AutoColumn gap="12px">
        <FixedHeightRow>
          <RowFixed>
            <DoubleCurrencyLogo currency0={token} margin={true} size={20} />
            <TYPE.white fontWeight={500} fontSize={20} style={{ marginLeft: '' }}>
              {`${chainId && token.equals(WETH[chainId]) ? 'WETH' : token.symbol}/VC`}
            </TYPE.white>
            <TYPE.black
              fontSize={12}
              fontWeight={500}
              ml="0.5rem"
              px="0.75rem"
              py="0.25rem"
              style={{ borderRadius: '1rem' }}
              backgroundColor={theme.yellow1}
            >
              V
            </TYPE.black>
          </RowFixed>
        </FixedHeightRow>

        <AutoColumn gap="8px">
          <RowBetween marginTop="10px">
            <ButtonSecondary width="68%" as={Link} to={`/migrate/v/${VLiquidityBalance.token.address}`}>
              Migrate
            </ButtonSecondary>

            <ButtonSecondary
              style={{ backgroundColor: 'transparent' }}
              width="28%"
              as={Link}
              to={`/remove/v/${VLiquidityBalance.token.address}`}
            >
              Remove
            </ButtonSecondary>
          </RowBetween>
        </AutoColumn>
      </AutoColumn>
    </HoverCard>
  );
}

export default withRouter(VPositionCard);
