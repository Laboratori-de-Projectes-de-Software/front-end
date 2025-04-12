import React, { useState, useEffect } from "react";
import "./Modal.css";
import { updateLeague } from "../controllers/LeaguesController";
import { useNavigate } from "react-router-dom";

interface EditLeagueModalProps {
    isOpen: boolean;
    onClose: () => void;
    league: {
        id: number;
        name: string;
        urlImagen: string;
        matchTime: number;
        rounds: number;
    } | null;
    onSuccess?: () => void; // To refresh the league list after editing
}

const EditLeagueModal: React.FC<EditLeagueModalProps> = ({
                                                             isOpen,
                                                             onClose,
                                                             league,
                                                             onSuccess,
                                                         }) => {
    const navigate = useNavigate();

    const [leagueData, setLeagueData] = useState({
        name: "",
        urlImagen: "",
        rounds: 3,
        matchTime: 15,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (isOpen && league) {
            // Pre-fill the form with the league's current data
            setLeagueData({
                name: league.name,
                urlImagen: league.urlImagen,
                rounds: league.rounds,
                matchTime: league.matchTime,
            });
        }
    }, [isOpen, league]);

    if (!isOpen || !league) return null;

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!leagueData.name.trim()) {
            newErrors.name = "The name is required.";
        }

        if (leagueData.rounds < 1) {
            newErrors.rounds = "There must be at least 1 round.";
        }

        if (leagueData.matchTime < 5) {
            newErrors.matchTime = "The minimum match time is 5 seconds.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setLeagueData((prev) => ({
            ...prev,
            [name]:
                name === "rounds" || name === "matchTime"
                    ? parseInt(value) || 0
                    : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            await updateLeague(
                league.id,
                leagueData,
                (updatedLeague) => {
                    console.log("League updated successfully:", updatedLeague);
                    if (onSuccess) onSuccess();
                    onClose();
                },
                (error) => {
                    console.error("Error updating league:", error);
                    if (
                        error.includes("Sesión expirada") ||
                        error.includes("token válido") ||
                        error.includes("Unauthorized")
                    ) {
                        alert("Your session has expired. Please log in again.");
                        navigate("/login");
                    } else {
                        alert(`Error updating league: ${error}`);
                    }
                }
            );
        } catch (error) {
            console.error("Request error:", error);
            const errorMessage =
                error instanceof Error ? error.message : "Unknown error";

            if (
                errorMessage.includes("Sesión expirada") ||
                errorMessage.includes("token válido") ||
                errorMessage.includes("Unauthorized")
            ) {
                alert("Your session has expired. Please log in again.");
                navigate("/login");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <h2>Edit League</h2>
                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="modal-form-group">
                        <label htmlFor="name">League Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={leagueData.name}
                            onChange={handleChange}
                            placeholder="League name"
                            required
                        />
                        {errors.name && (
                            <span className="modal-error-message">{errors.name}</span>
                        )}
                    </div>

                    <div className="modal-form-group">
                        <label htmlFor="urlImagen">Image URL (optional)</label>
                        <input
                            id="urlImagen"
                            name="urlImagen"
                            type="text"
                            value={leagueData.urlImagen}
                            onChange={handleChange}
                            placeholder="Image URL for the league"
                        />
                    </div>

                    <div className="modal-form-group">
                        <label htmlFor="rounds">Number of Rounds</label>
                        <input
                            id="rounds"
                            name="rounds"
                            type="number"
                            min="1"
                            value={leagueData.rounds}
                            onChange={handleChange}
                            required
                        />
                        {errors.rounds && (
                            <span className="modal-error-message">{errors.rounds}</span>
                        )}
                    </div>

                    <div className="modal-form-group">
                        <label htmlFor="matchTime">Match Time (seconds)</label>
                        <input
                            id="matchTime"
                            name="matchTime"
                            type="number"
                            min="5"
                            value={leagueData.matchTime}
                            onChange={handleChange}
                            required
                        />
                        {errors.matchTime && (
                            <span className="modal-error-message">{errors.matchTime}</span>
                        )}
                    </div>

                    <div className="modal-form-actions">
                        <button
                            type="button"
                            className="modal-cancel-button"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="modal-submit-button"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditLeagueModal;