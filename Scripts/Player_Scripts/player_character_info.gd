extends "res://Scripts/Player_Scripts/playerMovement.gd"
	
func _process(_delta: float):
	var player_text = $"Player_Sprite/Player Name"
	player_text.text = PlayerGlobalScript.player_name
