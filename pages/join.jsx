import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useI18n } from "../locales";

const Join = () => {
	const router = useRouter();
	const invalidCode = router.query.invalid;

	const [gameCode, setGameCode] = useState("");
	const t = useI18n();

	const onEnter = (e) => {
		if (e.key !== "Enter") return;

		router.push("/" + gameCode);
	};
	return (
		<div className="main-menu">
			<h4>{t("ui.join game")}</h4>

			<hr />

			<div>
				{invalidCode && (
					<div
						className="alert alert-error alert-danger alert-dismissable"
						role="alert"
					>
						{invalidCode}: {t("ui.invalid access code")}
					</div>
				)}
				<div>
					<label htmlFor="access-code">{t("ui.enter an access code")}</label>
					<input
						autoCorrect="off"
						autoCapitalize="off"
						type="text"
						id="access-code"
						placeholder="abcd"
						onChange={({ target: { value } }) => setGameCode(value)}
						onKeyDown={onEnter}
						autoFocus
						maxLength={4}
						style={{ fontFamily: "monospace" }}
					/>

					<div className="button-container">
						<Link href="/">
							<button>{t("ui.back")}</button>
						</Link>
						<Link href={"/" + gameCode}>
							<button>{t("ui.join")}</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Join;
