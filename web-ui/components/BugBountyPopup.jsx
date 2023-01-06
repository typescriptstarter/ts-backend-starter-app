import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useBitcoin } from '../context/BitcoinContext'
import { useRelay } from '../context/RelayContext'
const Run = require('run-sdk');

export const SuccessBBountySnackbar = (props) => {
    return (<div
      className="mx-2 sm:mx-auto max-w-sm  flex flex-row items-center justify-between bg-green-200 p-3 text-sm leading-none font-medium rounded-xl whitespace-no-wrap">
      <div className="inline-flex items-center text-green-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd" />
        </svg>
        Added bounty {props.amount} BSV 
      </div>
      <div className="text-green-700 cursor-pointer hover:text-green-800">
        <a target="_blank" rel="noreferrer" href={`https://whatsonchain.com/tx/${props.tx_id}`}>View</a>
      </div>
    </div>)
}

export const SuccessTBountySnackbar = (props) => {
    return (<div
      className="mx-2 sm:mx-auto max-w-sm  flex flex-row items-center justify-between bg-green-200 p-3 text-sm leading-none font-medium rounded-xl whitespace-no-wrap">
      <div className="inline-flex items-center text-green-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd" />
        </svg>
        Added bounty {props.amount} POWCO 
      </div>
      <div className="text-green-700 cursor-pointer hover:text-green-800">
        <a target="_blank" rel="noreferrer" href={`https://whatsonchain.com/tx/${props.tx_id}`}>View</a>
      </div>
    </div>)
}
  
  export const ErrorSnackbar = (props) => {
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

const BugBountyPopup = ({ address, onClose }) => {
    const { exchangeRate } = useBitcoin()
    const { relayOne, runOwner } = useRelay()
    const [tab, setTab] = useState("bitcoin")
    const [bAmount, setBAmount] = useState(0.1)
    const [tAmount, setTAmount] = useState(1)
    const [price, setPrice]=useState(0)
/*     const run = new Run({ owner:runOwner })
    const powco_contract = "93f9f188f93f446f6b2d93b0ff7203f96473e39ad0f58eb02663896b53c4f020_o2"
 */
    
    
    useEffect(() => {
        setPrice(exchangeRate * bAmount)
    },[bAmount])

    const handleBPay = async (e) => {
        e.preventDefault()
        let { txid, rawTx, satoshis } = await toast.promise(relayOne.send({
            to:address,
            amount:bAmount,
            currency:'BSV'
        }),{
            pending: 'Transaction is pending 🚀',
            success: {
              render({data}){
                return <SuccessBBountySnackbar amount={data.satoshis * 1e-8} tx_id={data.txid}/>
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
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          closeButton: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
        onClose()
        
    }

    const handleTPay = (e) => {
        e.preventDefault()
    }

    const handleChangeBAmount = (e) => {
        setBAmount(e.target.value)
    }

    const handleChangeTAmount = (e) => {
        setTAmount(e.target.value)
    }
  return (
    <div className='fixed inset-0'>
        <div className='flex flex-col h-screen'>
            <div className='grow cursor-pointer' onClick={onClose}/>
            <div className='flex'>
                <div className='grow cursor-pointer' onClick={onClose}/>
                <div className="flex-col max-w-sm w-[310px] p-5 rounded-lg bg-gray-100 dark:bg-gray-800">
                    <p className="text-2xl text-center font-bold text-gray-800 dark:text-gray-200">
                        Add a bounty to this issue 🤑
                    </p>
                    <div className='flex justify-center p-3'>
                        <div
                            onClick={() => setTab("bitcoin")} 
                            className={
                            tab === "bitcoin"
                                ? "text-sm leading-4 py-2 px-2 sm:px-3 text-gray-700 dark:text-gray-300 bg-gray-300 dark:bg-gray-600 font-medium mr-2 cursor-pointer rounded-md whitespace-nowrap"
                                : "text-sm leading-4 py-2 px-2 sm:px-3 text-gray-700 dark:text-gray-300 font-normal mr-2 cursor-pointer rounded-md whitespace-nowrap"
                            }
                        >Bitcoin</div>
                        <div
                            //onClick={() => setTab("token")} 
                            className={
                            tab === "token"
                                ? "text-sm leading-4 py-2 px-2 sm:px-3 text-gray-700 dark:text-gray-300 bg-gray-300 dark:bg-gray-600 font-medium mr-2 cursor-pointer rounded-md whitespace-nowrap"
                                : "text-sm leading-4 py-2 px-2 sm:px-3 text-gray-700 dark:text-gray-300 font-normal mr-2 cursor-pointer rounded-md whitespace-nowrap"
                            }
                        >Token</div>
                    </div>
                    {tab === "bitcoin" && <>
                        <div className="flex py-5">
                            <input 
                                type="number" 
                                className="rounded-none rounded-l-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                min={0}
                                max={21e8}
                                step={0.1}
                                value={bAmount}
                                onChange={handleChangeBAmount}
                                />
                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                &#x20BF;
                            </span>
                        </div>
                        <div className='flex justify-center'>
                            <button onClick={handleBPay} className="text-white bg-gradient-to-tr from-blue-500 to-blue-600 leading-6 py-1 px-10 font-bold border-none rounded cursor-pointer disabled:opacity-50 transition duration-500 transform hover:-translate-y-1">Add bounty ${price.toFixed(2)}</button>
                        </div>
                    </>}
                    {tab === "token" && <>
                        <div className="flex py-5">
                            <input 
                                type="number" 
                                className="rounded-none rounded-l-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                min={0}
                                max={21e8}
                                step={1}
                                value={tAmount}
                                onChange={handleChangeTAmount}
                                />
                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                POWCO
                            </span>
                        </div>
                        {/* Disabled til I figure how to send run token */}
                        <div className='flex justify-center'>
                            <button disabled onClick={handleTPay} className="text-white bg-gradient-to-tr from-blue-500 to-blue-600 leading-6 py-1 px-10 font-bold border-none rounded cursor-pointer disabled:opacity-50 transition duration-500 transform hover:-translate-y-1 ">Add bounty {tAmount} POWCO</button>
                        </div>
                    </>}
                </div>
                <div className='grow cursor-pointer' onClick={onClose}/>
            </div>
            <div className='grow cursor-pointer' onClick={onClose}/>
        </div>
    </div>
  )
}

export default BugBountyPopup