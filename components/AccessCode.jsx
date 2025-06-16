import { useI18n } from "../locales";

const AccessCode = ({ code }) => {
	const t = useI18n();

	return (
		<>
			<div className="access-code">
				{t("ui.access code")}: <span>{code}</span>
			</div>
			<style>{`
            .access-code {
                margin: .8em;
				margin-bottom: 1.5em;
            }
            .access-code > span {
                box-shadow: 0 0 10pt 1pt #d3d3d3;
                padding: .4em;
            }
        `}</style>
		</>
	);
};

export default AccessCode;
