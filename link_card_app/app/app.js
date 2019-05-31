$(document).ready(function () {
    let htmlText = "";
    var desc = "";
    app.initialized()
        .then(function (_client) {

            var client = _client;
            console.log(client);
            client.events.on('app.activated', function () {
                client.instance.resize({ height: "700px" });
                $("#urlButton").click(function () {
                    var url1 = $("#url").val();
                    console.log(url1);
                    var options = {};
                    var url = "https://api.linkpreview.net?key=5c4718f52c56d5fb0c358e97c5b0b3b3c7d090209e6ee&q=" + url1;
                    client.request.get(url, options)
                        .then(
                            function (data) {
                                var result = JSON.parse(data.response)
                                console.log(result);
                                let colorOfTemplate = "";
                                colorOfTemplate = $("input[name='color']:checked").val();

                                $('input[name="color"]').click(function () {
                                    if ($(this).is(':checked')) {
                                        $(this).css('padding', '30px');
                                    }
                                });

                                var sty1 = `<a href="${url1}" name="linkcard" id="linkcard"
                            style= "font-family: "Helvetica Neue", Helvetica,Arial, sans-serif;
                                              border-radius : 25px;
                                              font-size: 14px;
                                              font-weight: 300;
                                              line-height: 22px;
                                              letter-spacing: .4px;
                                               background-color: ${colorOfTemplate};
                                               padding-top: 30px;">
                            
                                   <div style="display: inline-block;
                                   box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                             font-color: lime	;
                                              border : 1px lime;`,

                                    sty2 = `font-size: 14px;
                                              font-weight: 300;
                                              line-height: 22px;
                                              letter-spacing: .4px;
                                               background-color: ${colorOfTemplate};
                             margin: 20px;
                             width: 550px;
                             height:250px;
                             max-height : 400px;

                             position: relative;
                             margin-bottom: 50px;
                             transition: all .2s ease-in-out;">
                            
                           
                                <br>     <div style="height: 200px;
                             opacity: .7;
                             overflow: hidden;
                             transition: all .2s ease-in-out;">
                                       <img alt="No image found" src="`,

                                    sty3 = `"style=" display:block ; margin-left:auto ;  margin-right:auto ; width="30%" ; height=70px" > </center>


                            <div style="background: ${colorOfTemplate};
                             padding: 20px;
                             max-height : 500px;
                                ">
                            <h5 style="color:blue ; text-align : center; size:30px;"><b>${result.title.toUpperCase()}</b></h5>
                                 <p style="margin-bottom:0px;color:blue"">`,
                                    sty4 = `</p></div></div></div>`

                                if ($("#template1").prop("checked")) {
                                    if (result.image === "" && result.description !== "")
                                        htmlText += sty1 + sty2 + "/sample.jpg" + sty3 + result.description + sty4;

                                    else if (result.image !== "" && result.description === "")
                                        htmlText += sty1 + sty2 + result.image + sty3 + "No description" + sty4;

                                    else if (result.image !== "" && result.description != "")
                                        htmlText += sty1 + sty2 + result.image + sty3 + result.description + sty4;

                                    else
                                        htmlText += sty1 + sty2 + "/sample.jpg" + sty3 + "No description" + sty4;
                                }
                                else {
                                    if (result.image === "" && result.description !== "")
                                        htmlText += sty1 + "border-radius : 25px;" + sty2 + "freshdesk_logo.png" + sty3 + result.description + sty4;

                                    else if (result.image !== "" && result.description === "")
                                        htmlText += sty1 + "border-radius : 25px;" + sty2 + result.image + sty3 + "No description" + sty4;

                                    else if (result.image !== "" && result.description != "")
                                        htmlText += sty1 + "border-radius : 25px;" + sty2 + result.image + sty3 + result.description + sty4;

                                    else
                                        htmlText += sty1 + "border-radius : 25px;" + sty2 + "freshdesk_logo.png" + sty3 + "No description" + sty4;
                                }

                                client.interface.trigger("setValue", {
                                    id: "editor", text: htmlText
                                }
                                );
                            },
                            function (error) { //console.log("sample")
                                window.alert("Error: " + error.response)
                            }
                        );
                });
            });
        });
});

