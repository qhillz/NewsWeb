import React, { useEffect, useRef } from 'react';
import './Header.scss';
import Adver from '../img/Adver.png';
import { setCategory } from '../Modules/Category';
import { useDispatch } from 'react-redux';
import Logo from '../img/CNN.png';
import { useMediaQuery } from 'react-responsive';

function Header() {
  let menu_button = useRef<HTMLLIElement>(null);
  let menu_all = useRef<HTMLDivElement>(null);
  let button = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const setDiffCategory = (category : string)=>dispatch(setCategory(category)); 
  let Mb = useMediaQuery({
    query: "(max-width:768px)"
  })

  function listsorting(header_list : HTMLCollectionOf<HTMLElement>, list_rights : number[], shortened_list_child : HTMLCollectionOf<HTMLElement>){
    let menu_button_collection = menu_button.current?.children as HTMLCollectionOf<HTMLElement>;

    for(let i = list_rights.length-1; i >= 0; i--){
      if(list_rights[i] > window.innerWidth){

        header_list[i].style.display = "none";
        shortened_list_child[i].style.display = "flex";
        if(i == list_rights.length-1){
          menu_button_collection[0].style.display = "block";
        }
      }
      else{
        header_list[i].style.display = "block";
        shortened_list_child[i].style.display = "none";
        if(i == list_rights.length-1){
          menu_button_collection[0].style.display = "none";
        }
      }
    }
  }

  useEffect(()=>{
    if(menu_all.current){
      menu_all.current.style.visibility = "hidden";
    }
  },[]);

  useEffect(()=>{
    let header_list = document.querySelector(".sort1")?.children as HTMLCollectionOf<HTMLElement>;
    let shortened_list = document.querySelector(".menu_shortened") as HTMLElement;
    let shortened_list_child = shortened_list?.children as HTMLCollectionOf<HTMLElement>;
    let list_rights : number[] = [];

    if(header_list){
      for (let i = 0; i < header_list.length-1; i++) {
        header_list[i].onclick = ()=>{
          setDiffCategory(header_list[i].textContent ?? "");
        }
        list_rights.push(header_list[i].getBoundingClientRect().right + 400);
      }
    }

    for (let i = 0; i < shortened_list_child.length; i++) {
      shortened_list_child[i].onclick = ()=>{
        setDiffCategory(shortened_list_child[i].textContent ?? "");
      }
    }

    if(menu_button.current){
      menu_button.current.onpointerenter = ()=>{
        shortened_list.style.display = "flex";
      }
  
      menu_button.current.onpointerleave = ()=>{
        shortened_list.style.display = "none";
      }
    }

    window.onresize = ()=>{
      listsorting(header_list, list_rights,shortened_list_child);
    }

    listsorting(header_list, list_rights,shortened_list_child);
  },[Mb]);

  useEffect(()=>{
    setTimeout(()=>{
      if(menu_all.current)
        menu_all.current.style.visibility = "visible";
    },500);
  },[]);

  return (
    <div className='header'>
      <div className="background">
        <img className="adver" src={Adver}></img>
      </div>
      <div className='inner_header' ref={menu_all}>
      <div className="sort">
        <div className="container" ref={button}>
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
        <div className="rect"><img src={Logo}></img></div>
        <ul className="sort1">
          <li id="business" className="menu_text">business</li>
          <li id="entertainment" className="menu_text">entertainment</li>
          <li id="health" className="menu_text">health</li>
          <li id="science" className="menu_text">science</li>
          <li id="technology" className="menu_text">technology</li>
          <li id="menu" className="menu_text_sub" ref={menu_button}>
            <span className="menu_title">Menu</span>
            <ul className="menu_shortened">
              <li id="business">business</li>
              <li id="entertainment">entertainment</li>
              <li id="health">health</li>
              <li id="science">science</li>
              <li id="technology">technology</li>
            </ul>
          </li>
        </ul>
        <ul className="sort2">
          <li>Audio</li>
          <li>Live TV</li>
          <li>Login</li>
        </ul>
      </div>
      </div>
    </div>
  );
}

export default Header;