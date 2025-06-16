import Router from "next/router";
import { useI18n } from "../locales";

import { logEvent } from "../utils/analytics";

import Settings from "./Settings";
import ThanksForPlaying from "./ThanksForPlaying";
import AccessCode from "./AccessCode";
import HideableContainer from "./HideableContainer";

const Lobby = ({ gameState, socket, isRocketcrab }) => {
	const playerList = gameState.players.map((player) => ({
		...player,
		isMe: player.name === gameState.me.name,
	}));
	const handleStartGame = () => {
		socket.emit("startGame");

		logEvent("lobby-numberOfPlayers", gameState.players.length);
		logEvent("lobby-locationPack", gameState.settings.locationPack);
		logEvent("lobby-timeLimit", gameState.settings.timeLimit);
	};

	const t = useI18n();

	return (
		<>
			<h4>{t("ui.welcome to spyfall")}</h4>

			{!isRocketcrab && <AccessCode code={gameState.code} />}

			<hr />

			<ol className="lobby-player-list">
				{playerList.map((player, i) => (
					<li key={i} className="player-box">
						{player.name}
						{!player.name && <i>Joining...</i>}

						{player.isMe && !isRocketcrab && (
							<a
								href="#"
								className="btn-edit-player"
								data-player-id="{{ _id }}"
								onClick={() => socket.emit("clearName")}
							>
								Edit name
							</a>
						)}
						{!player.isMe && (
							<a
								href="#"
								className="btn-remove-player"
								data-player-id="{{ _id }}"
								onClick={() => socket.emit("removePlayer", player.name, true)}
							>
								Remove player
							</a>
						)}
					</li>
				))}
			</ol>
			<br />
			<HideableContainer title={"Game Settings"} initialHidden={true}>
				<Settings gameState={gameState} socket={socket} />
			</HideableContainer>

			<div className="button-container">
				<button
					className="btn-start"
					onClick={handleStartGame}
					disabled={gameState.status !== "lobby-ready"}
				>
					{t("ui.start game")}
				</button>
				{!isRocketcrab && (
					<button
						className="btn-leave"
						onClick={() => {
							socket.emit("removePlayer", gameState.me.name);

							//prevents a redirect back to /[gameCode]
							socket.off("disconnect");

							Router.push("/");
						}}
					>
						{t("ui.leave game")}
					</button>
				)}
			</div>
			{gameState.currentRoundNum > 1 && <ThanksForPlaying />}
		</>
	);
};

export default Lobby;
