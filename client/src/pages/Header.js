import React, {Component} from "react";

const Header = props =>
<div className="header">
   <nav className="navbar navbar-fixed-top " role="navigation">
      <div className="container">
         <div className="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#top-navbar-1">
   				<span class="sr-only">Toggle navigation</span>
   				<span class="icon-bar"></span>
   				<span class="icon-bar"></span>
   				<span class="icon-bar"></span>
				</button>
                <a href="index.html">Feed It Forward logo goes here</a>
            </div>
            
            <div className="collapse navbar-collapse" id="top-navbar-1">
               <ul className="nav navbar-nav navbar-right">
                  <li><a href="#">Home</a></li>
                  <li><a href="#learn-more">Learn More</a></li>
                  <li><a class="btn btn-link-3" data-toggle="modal" data-target="#signInModal">Sign In</a></li>
               </ul>
            </div>
        </div>
    </nav>
</div>

export default Header;