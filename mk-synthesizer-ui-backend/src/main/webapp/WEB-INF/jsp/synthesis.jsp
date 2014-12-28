<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
  <head>
    <title>Hello :: Spring Application</title>
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script type="text/javascript" src="<c:url value="/resources/js/synthesis.js" />" ></script>
  </head>

  <body>
    <h1>Hello - Spring Application</h1>
    <p>Greetings.</p>
    <input id="synthesize" type="button" value="SendRequest" />
  </body>
</html>