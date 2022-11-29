import React from 'react'
import { toast } from 'react-toastify'
import { useBitcoin } from '../context/BitcoinContext'
import axios from 'axios'

import { wrapRelayx } from 'stag-relayx'
import { useRelay } from '../context/RelayContext'


const SuccessSnackbar = (props) => {
  return (<div
    className="mx-2 sm:mx-auto max-w-sm  flex flex-row items-center justify-between bg-green-200 p-3 text-sm leading-none font-medium rounded-xl whitespace-no-wrap">
    <div className="inline-flex items-center text-green-500">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd" />
      </svg>
      Bought {props.difficulty} difficulty
    </div>
    <div className="text-green-700 cursor-pointer hover:text-green-800">
      <a target="_blank" rel="noreferrer" href={`https://whatsonchain.com/tx/${props.tx_id}`}>View</a>
    </div>
  </div>)
}

const ErrorSnackbar = (props) => {
  console.log(props)
  return (
    <div
      className="mx-2 sm:mx-auto max-w-sm  flex flex-row items-center justify-between bg-red-200 p-3 text-sm leading-none font-medium rounded-xl whitespace-no-wrap">
      <div className="inline-flex items-center text-red-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd" />
        </svg>
        {props.message}
      </div>
    </div>
  )
}

const BoostButton = ({ tx_id, zenMode, difficulty }) => {
  const { relayOne } = useRelay()
  //const { boost } = useBitcoin()
const boost = async (contentTxid) => {
  const stag = wrapRelayx(relayOne)
  const {txid, txhex, job} = await stag.boost.buy({
    content: contentTxid,
    value: 124_000,
    difficulty: 0.025
  })
  relayOne.send({
    currency: 'BSV',
    amount: 0.00052,
    to: '1MqPZFc31jUetZ5hxVtG4tijJSugAcSZCQ' // askbitcoin.ai revenue address
  })
  .then(result => {
    console.log('relayone.send.reward.result', result)
  })
  .catch(error => {
    console.log('relayone.send.reward.error', error)
  })

  return {txid, txhex, job}
  
  
}



const handleBoost = async (e) => {
  e.stopPropagation()
  e.preventDefault()


  const value = 0.05
  const currency="USD"

  


      let {txid, txhex, job} = await toast.promise(boost(tx_id), {
        pending: 'Transaction is pending 🚀',
        success: {
          render({data}){
            return <SuccessSnackbar difficulty={data.job.difficulty} tx_id={data.txid}/>
          },
          icon:false
        },
        error: {
          render({data}){
            return <ErrorSnackbar message={data.message}/>
          },
          icon:false
        }
      }, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      })

      console.log('bitcoin.boost.result', {txid, txhex,job});
}
  return (
    <div onClick={handleBoost} className={`col-span-3 ${zenMode && "justify-center"} flex group items-center w-fit relative`}>
        <div className={`hidden group-hover:block animate-ping absolute ${zenMode ? "justify-center":"left-[18px]"} min-h-[33px] min-w-[33px] rounded-full bg-blue-200`}></div>
        <div className={`hidden group-hover:block animate-ping  delay-75 absolute ${zenMode ? "justify-center":"left-[24px]"} min-h-[22px] min-w-[22px] rounded-full bg-blue-400`}></div>
        <div className={`hidden group-hover:block animate-ping  delay-100 absolute ${zenMode ? "justify-center":"left-[29px]"} min-h-[11px] min-w-[11px] rounded-full bg-blue-600`}></div>
        <svg viewBox='0 0 65 65' className='relative min-h-[69px] min-w-[69px] stroke-1 stroke-gray-500 dark:stroke-gray-300 rounded-full group-hover:stroke-blue-500'>
            <path
                d="M40.1719 32.6561C40.1719 35.6054 38.5079 38.1645 36.0692 39.4499C35.002 40.0122 33.7855 36.2423 32.4945 36.2423C31.1288 36.2423 29.8492 40.0696 28.7418 39.4499C26.4007 38.1359 24.8228 35.5308 24.8228 32.6561C24.8228 28.4214 28.2598 24.9844 32.4945 24.9844C36.7291 24.9844 40.1719 28.4157 40.1719 32.6561Z"
                className='stroke-gray-500 dark:stroke-gray-300 group-hover:stroke-blue-500'
                fill='transparent'
            ></path>
        </svg>
        {!zenMode && <p className="text-gray-500 dark:text-gray-300 group-hover:text-blue-500 -ml-3">
             {difficulty.toFixed(3)} 
        </p>}
    </div>
   
  )
}

export default BoostButton