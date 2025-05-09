extends Control

@export var login_warning_text: RichTextLabel
@export var login_username_input: LineEdit
@export var login_password_input: LineEdit
@export var validate_loading: Control
@export var warning_text: RichTextLabel

#for loading panel
@export var loading_panel: Panel

func _ready():
	loading_panel.visible = false
	validate_loading.visible = false
	
func _process(_delta: float):
	if !PlayerGlobalScript.modal_open:
		login_warning_text.text = ""

func _on_log_in_button_pressed():
	if !login_username_input.text or !login_password_input.text:
		login_warning_text.text = "Fields cannot be empty."
	
	else:
		validate_loading.visible = true
		BackendStuff.send_data_to_express({ "username": login_username_input.text, "password": login_password_input.text }, "/validate/login")
		
		await get_tree().create_timer(1.0).timeout
		validate_loading.visible = false
		warning_text.text = BackendStuff.returned_parsed["status"]
		
		if BackendStuff.returned_parsed["status"] == "account exists":
			loading_panel.visible = true
			PlayerGlobalScript.player_name = "fetching..."
			PlayerGlobalScript.player_username = login_username_input.text
			
			loading_panel.begin_load = true
			PlayerGlobalScript.isLoggedIn = true
			PlayerGlobalScript.modal_open = false
