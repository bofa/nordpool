import React from 'react'
import { Button, Grid, Header, List, Segment } from 'semantic-ui-react'
import Chart from './components/Chart'
import electricityPriceImport from './raw.json'
import Moment from 'moment'

console.log('electricityPrice', electricityPriceImport)

const electricityPrice = electricityPriceImport
  .map(data => [Moment(data.StartTime).unix(), Number(data.SE2.replace(',', '.'))])
  .sort((a, b) => a[0] - b[0])

console.log('electricityPrice', electricityPrice)

import { CustomMessage, Navbar } from 'components'
import 'styling/semantic.less'

const leftItems = [
  {
    as: 'a',
    content: 'Documentation',
    href: 'https://react.semantic-ui.com/',
    icon: 'book',
    key: 'docs',
    target: '_blank'
  },
]
const rightItems = [
  {
    as: 'a',
    content: 'Github',
    href: 'https://github.com/Semantic-Org/Semantic-UI-React',
    icon: 'github',
    key: 'github',
    target: '_blank'
  },
  {
    as: 'a',
    content: 'Stack Overflow',
    icon: 'stack overflow',
    href: 'https://stackoverflow.com/questions/tagged/semantic-ui-react?sort=votes',
    key: 'so',
    target: '_blank',
  }
]

const options = {

  chart: {
    zoomType: 'x'
  },

  title: {
    text: 'Electricity Price Sweden SE2'
  },

  subtitle: {
    text: 'Suckit OVE!'
  },

  yAxis: {
    title: {
      text: 'Price'
    }
  },

  xAxis: { type: 'datetime' },

  series: [{
    type: 'line',
    data: electricityPrice
  }]

}

const App = () => (
  <Navbar leftItems={leftItems} rightItems={rightItems}>
    <Segment>
      <Header as='h1'>Your example App</Header>
      <Chart {...{ container: 'chart-funnel', options: options}} />
    </Segment>
  </Navbar>
)

export default App
