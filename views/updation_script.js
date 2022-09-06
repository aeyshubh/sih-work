console.log("I am alice");

var select = document.getElementById('field');
var text = select.options[select.selectedIndex].text;
console.log(text);

function fieldselect(src)
	{
			window.location=src;
	}
  
	
	function AadharValidate() {
        var aadhar = document.getElementById("txtAadhar").value;
        var adharcardTwelveDigit = /^\d{12}$/;
        var adharSixteenDigit = /^\d{16}$/;
        if (aadhar != '') {
            if (aadhar.match(adharcardTwelveDigit)) {
                return true;
            }
            else if (aadhar.match(adharSixteenDigit)) {
                return true;
            }
            else {
                alert("Enter valid Aadhar Number");
                return false;
            }
        }
    }

    function AccNumberValidate() {
        var number = document.getElementById("accnumber").value;
        var accnoTwelveDigit = /^\d{11}$/;
        var accnoSixteenDigit = /^\d{16}$/;
        if (number != '') {
            if (number.match(accnoSixteenDigit)) {
                return true;
            }else if (number.match(accnoTwelveDigit)) {
                return true;
            }
            else {
                alert("Enter valid Bank Account Number");
                return false;
            }
        }
    }

function PanValidate() {
    var num = document.getElementById("panno").value;
    var pannumber = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
    if (num != '') {
        if (num.match(pannumber)) {
            return true;
        }
        else {
            alert("Enter valid PAN Number in format: ABCDE0123F");
            return false;
        }
    }
}

function BankNameValidate() {
    var name = document.getElementById("bankname").value;
    var bankname = /^[a-zA-Z ]{2,30}$/;
    if (name != '') {
        if (name.match(bankname)) {
            return true;
        }
        else {
            alert("Enter a valid Bank Name");
            return false;
        }
    }
}

function NameValidate() {
    var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
var name = document.getElementById('name').value;
if(!regName.test(name)){
    alert('Please enter valid full name (first & last name).');
    return false;
}else{
    alert('Valid name given.');
    return true;
}
}