<!DOCTYPE html>
<html lang="en">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
		<title>Spring Boot 集成Mybatis + Mapper + Pagehelper 测试例子</title>
	</head>
	<body>
		<h1 id="bookingSummary" class="center-text">${title}</h1>
		<table id="bookingSummaryTable" class="center">
			<thead>
				<tr>
					<th>
						<pre>#ID</pre>
					</th>
					<th>Organization</th>
					<th>Room</th>
					<th colspan="2">Timeslot Start</th>
					<th colspan="2">Timeslot End</th>
					<th>User</th>
					<th>
						<pre>Action</pre>
					</th>
				</tr>
			</thead>
			<#assign index=1>
			<tbody>
				<#if content.list?exists>
					<#list content.list as booking>
							<tr
								<#if index%2==0>
									style="background-color: lightgray;"
								<#else>
									style="border-style: groove"
								</#if>
							>
								<td>${booking.id}</td>
								<td>${booking.nameEngOrg}</td>
								<td>${booking.nameEngRoom}</td>
								<td>${booking.timeslotStart?date?iso_utc}</td>
								<td>${booking.timeslotStart?time}</td>
								<td>${booking.timeslotEnd?date?iso_utc}</td>
								<td>${booking.timeslotEnd?time}</td>
								<td>${booking.nameEngUser}</td>
                                                                <td>
									<#assign host="localhost">
                                <#if booking.action==0>
                                                                        <img src="" alt="forbidden_for_any_change" />
                                                                <#elseif booking.action==1>
                                                                        <img src="http://${host}:8081/api/statics/getImage?filepath=statics/img/add.png" alt="allow_booking" width="24px" height="24px" />
                                                                <#elseif booking.action==-1>
                                                                        <img src="http://${host}:8081/api/statics/getImage?filepath=statics/img/cancel.png" alt="cancel_booking" width="24px" height="24px" />
                                                                        </#if>
                                                                </td>
							</tr>
							<#assign index=index+1>
					</#list>
				</#if>
			</tbody>
		</table>
		<hr>
		<footer class="center-text">
			<pre>Copyright &copy; 2022</pre>
		</footer>
	</body>
	<style>
		#bookingSummaryTable {
			text-align: center;
		}
		#bookingSummaryTable > thead > tr > th {
			font-size: 24px;
			border-style: groove;
			font-weight: bold;
			background-color: #deb252;
		}
		#bookingSummaryTable > tbody > tr > td {
			font-size: 24px;
			border-style: groove;
		}
		.center {
			margin-left: auto;
			margin-right: auto;
		}
		.center-text {
			text-align: center;
		}
		footer {
			font-size: 18px;
		}
	</style>
</html>
