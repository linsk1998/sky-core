
try {
	window.execScript([
		'Class VBDocument',
		'	Public Property Get [currentScript]',
		'		For Each script in document.getElementsByTagName("SCRIPT")',
		'			If script.readyState = "interactive" Then',
		'				Set [currentScript]=script',
		'				Exit Property',
		'			End If',
		'		Next',
		'		Set [currentScript] = Null',
		'	End Property',
		'End Class',
		'Function VBDocumentFactory()',
		'	Set VBDocumentFactory = New VBDocument',
		'End Function'
	].join('\n'), 'VBScript');
} catch(e) {
	console.error("不支持 IE11 仿真模式");
}

export default VBDocumentFactory();