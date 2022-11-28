import React, { useState, useCallback, useContext, useEffect } from 'react'
import { useRouter } from "next/router"
import axios from 'axios';
import {
    Editable,
    withReact,
    Slate,
    ReactEditor,
    useFocused,
} from "slate-react";
import { createEditor, Node } from "slate";

import nimble from "@runonbitcoin/nimble";
import bops from "bops";

import { toast } from "react-toastify"


import { useRelay } from '../context/RelayContext';
import { useTuning } from '../context/TuningContext';
import axiosInstance, { useAPI } from '../hooks/useAPI';
import { PostCard } from '.';
import { useBitcoin } from '../context/BitcoinContext';




const Composer = ({ reply_tx, successAction }) => {
    const router = useRouter()
    const [twetchPost, setTwetchPost] = useState()
    const [placeholder, setPlaceholder] = useState("What's the latest?")
    const { tag, setTag } = useTuning() 
    const { send, authenticated } = useBitcoin()
    const [editor] = useState(() => withReact(createEditor()));
    const renderElement = useCallback((props) => <Element {...props} />, []);
    const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
    const blankSlateValue = [{ type: "paragraph", children: [{ text: "" }] }];
    const [value, setValue] = useState(blankSlateValue);


    useEffect(()=>{
      if(reply_tx){
        setPlaceholder(`Add your answer`)
      } else {
        switch (tag){
          //case "1F9E9":
            case "question":
            setPlaceholder("Ask Bitcoin a question")
            break;
          //case "1F4A1":
            case "answer":
            setPlaceholder("What do you have in mind?")
            break;
          //case "1F48E":
            case "project":
            setPlaceholder("What are you building?")
            break;
          default: 
            setPlaceholder("What's the latest?")
        }
      }
      
    },[tag, reply_tx])

    const serialize = nodes => {
      return nodes.map(n => Node.string(n)).join('\n')
    }


    const handlePost = async (e) => {
      e.preventDefault()
      const content = serialize(editor.children)
    
      let resp = await toast.promise(send(content, reply_tx), {
        pending: 'Transaction is pending 🚀',
        success: 'Transaction successful 🥳',
        error: {
          render({data}){
            return `${data}`
          }
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
      });
      console.log(resp);
      setValue(blankSlateValue)

      let rawTx = resp.rawTx || resp.rawtx;
      let txid = resp.txid;

      (async () => {
        try {
          let { data: postTransactionResponse } = await axios.post('https://powco.dev/api/v1/transactions', {
            transaction: rawTx
          });

          console.log('powco.dev_postTransactionResponse', postTransactionResponse);
        } catch (error) {
          console.error('postTransactionResponse', error);
        }
      })();

      (async () => {
        try {
          let { data: postTransactionResponse } = await axios.post('https://pow.co/api/v1/transactions', {
            transaction: rawTx
          });

          console.log('powco_post_transaction_response', postTransactionResponse);
        } catch (error) {
          console.error('powco_post_transaction_response', error);
        }
      })();


      (async () => {
        try {
          let { data: postTransactionResponse } = await axios.post('https://pow.co/api/v1/jobs', {
            transaction: rawTx
          });

          console.log('powco_post_transaction_response', postTransactionResponse);
        } catch (error) {
          console.error('powco_post_transaction_response', error);
        }
      })();

    };

    const handleChange = async (newValue) => {
      const twetchPostRegex = /http(s)?:\/\/(.*\.)?twetch\.com\/t\/([A-z0-9_/?=]+)/;
      let match = newValue[0].children[0].text.match(twetchPostRegex)
      
      if (match){
        /* let twetchTx = match[3]
        try {
          const resp = await axiosInstance.get(`/api/v1/twetch/${twetchTx}`)
          setTwetchPost(resp.data.twetch)  
          setValue(blankSlateValue)      
        } catch (error) {
          console.log("twetch.not.found")
          setTwetchPost()
        } */
      } else {
        setValue(newValue)
        //setTwetchPost()
      }
    }

  return (
    <div
      className={
         `flex flex-col p-3 rounded-lg sm:rounded-xl text-gray-900 dark:text-white ${reply_tx ? "bg-gray-200 dark:bg-gray-500":"bg-gray-100 dark:bg-gray-600"} dark:${reply_tx ? "bg-gray-500":"bg-gray-600"}`
      }
    >
      <Slate
        editor={editor}
        value={value}
        onChange={(newValue) => handleChange(newValue)}
      >
        <Editable
          placeholder={placeholder}
          renderLeaf={renderLeaf}
          renderElement={renderElement}
          style={{
            position: "relative",
            outline: "none",
            whiteSpace: "pre-wrap",
            overflowWrap: "break-word",
            minHeight: "22px",
          }}
        />
      </Slate>
      {twetchPost && <div className='mt-2 border rounded-lg border-gray-300 dark:border-gray-700'><PostCard post={twetchPost}/></div>}
      <div className="flex items-center mt-2">
        {/* <>
          {router.pathname === "/compose" && <div className='rounded-full bg-gray-300 dark:bg-gray-700 py-2 px-4 flex items-center'>
            <div className="flex items-center mr-2">
                <input onChange={(e)=>setTag(e.target.value)}  checked={tag === ""} id="problem-tag" type="radio" value="" name="radio-tag" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"/>
                <label htmlFor="problem-tag" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"></label>
            </div> 
            <div className="flex items-center mr-2">
                <input onChange={(e)=>setTag(e.target.value)}  checked={tag === "question"} id="problem-tag" type="radio" value="question" name="radio-tag" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"/>
                <label htmlFor="problem-tag" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer">🧩</label>
            </div>
            <div className="flex items-center mr-2">
                <input onChange={(e)=>setTag(e.target.value)} checked={tag === "answer" } id="idea-tag" type="radio" value="answer" name="radio-tag" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"/>
                <label htmlFor="idea-tag" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer">💡</label>
            </div>
            <div className="flex items-center">
                <input onChange={(e)=>setTag(e.target.value)} checked={tag === "project"} id="project-tag" type="radio" value="project" name="radio-tag" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"/>
                <label htmlFor="project-tag" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer">💎</label>
            </div>
            <div className="ml-2 flex items-center">
                <input onChange={(e)=>setTag(e.target.value)} checked={tag === "test"} id="test-tag" type="radio" value="test" name="radio-tag" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"/>
                <label htmlFor="project-tag" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer">🐛</label>
            </div> 
          </div>}
         </> */}
        <div className='grow'/>
        <button
          onClick={handlePost}
          disabled={!authenticated || value[0].children[0].text.length === 0}
          className="text-white bg-gradient-to-tr from-blue-500 to-blue-600 leading-6 py-1 px-4 font-bold border-none rounded cursor-pointer flex items-center text-center justify-center disabled:opacity-50 transition duration-500 transform hover:-translate-y-1"
        >
          Post<span className='ml-1 hidden sm:block'>$0.02</span>
        </button>
      </div>
    </div>
  )
}

const Element = ({ attributes, children, element }) => {
    switch (element.type) {
      /* case 'block-quote':
          return <blockquote {...attributes}>{children}</blockquote>
        case 'bulleted-list':
          return <ul {...attributes}>{children}</ul>
        case 'heading-one':
          return <h1 {...attributes}>{children}</h1>
        case 'heading-two':
          return <h2 {...attributes}>{children}</h2>
        case 'list-item':
          return <li {...attributes}>{children}</li>
        case 'numbered-list':
          return <ol {...attributes}>{children}</ol> */
      default:
        return (
          <p {...attributes} className="RichInput_inputLabel__QYxaP">
            {children}
          </p>
        );
    }
  };
  
  const Leaf = ({ attributes, children, leaf }) => {
    /* if (leaf.bold) {
        children = <strong>{children}</strong>
      }
    
      if (leaf.code) {
        children = <code>{children}</code>
      }
    
      if (leaf.italic) {
        children = <em>{children}</em>
      }
    
      if (leaf.underline) {
        children = <u>{children}</u>
      } */
  
    return <span {...attributes}>{children}</span>;
  };

export default Composer;


const B_PREFIX = `19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut`;
const AIP_PREFIX = `15PciHG22SNLQJXMoSUaWVi7WSqc7hCfva`;
export const MAP_PREFIX = `1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5`;