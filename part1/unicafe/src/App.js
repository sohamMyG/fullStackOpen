import React, { useState } from 'react'

const Heading = ({text}) => <h1>{text}</h1>

const Button = ({text,onClick}) => <button onClick={onClick}>{text}</button>

const Statistics = (props)=> {
  if(props.good>0 || props.good>0 || props.neutral>0){
    return (
      <div>
        <table>
          <tbody>
          <StatisticLine text={"good"} count={props.good} /> 
          <StatisticLine text={"neutral"} count={props.neutral} /> 
          <StatisticLine text={"bad"} count={props.bad} /> 
          <StatisticLine text={"all"} count={props.all} /> 
          <StatisticLine text={"average"} count={props.avg} /> 
          <StatisticLine text={"positive"} count={props.positive} /> 
          </tbody>
        </table> 
      </div>
    )  
  }
  return <div>No feedback given</div>
  
}

const StatisticLine= (props)=> (
    <tr>
      <td> {props.text} </td>
      <td>{props.count} </td>
    </tr>

)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increment = (count,func) => () => func(count+1)
  const all = ()=> good+bad+neutral
  const avg = ()=> (good-bad)/all()
  const positiveFeedback = () => {
    return ((good/all() *100)+" %")
  }

  return (
    <div>
      <Heading text={"give feedback"}/>
      <Button text={"good"} onClick={increment(good,setGood)} />
      <Button text={"neutral"} onClick={increment(neutral,setNeutral)} />
      <Button text={"bad"} onClick={increment(bad,setBad)} />
      <Heading text={"statistics"}/>
      <Statistics good={good} bad={bad} neutral={neutral} all={all()}
                  avg={avg()} positive={positiveFeedback()} />
    </div>
  )
}

export default App