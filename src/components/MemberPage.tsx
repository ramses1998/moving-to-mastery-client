import React, {useContext, useEffect, useState} from "react";
import {Avatar, Box, Chip, Link, Skeleton, Typography} from "@mui/material";
import {Member} from "../api/members";
import {AppContext} from "../context/AppContext";
import styled from "styled-components";

export const MemberPage: React.FC = () => {

    const context = useContext(AppContext)
    const [members, setMembers] = useState<Member[] | undefined>(undefined)

    useEffect(() => {
        loadMembers().then(data => setMembers(data))
    }, [])

    const loadMembers = async (): Promise<Member[]> => {
        return context.getAllMembers()
    }

    if (members === undefined) return <PersonListLoadingSkeleton/>

    return (
        <Box sx={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 3,
            "@media screen and (max-width: 900px)": {
                gridTemplateColumns: "repeat(1, 1fr)",
            }
        }}>
            {members.map((member, idx) =>
                <PersonCardItem
                    key={idx}
                    member={member}
                />
            )}
        </Box>
    )
}

type PropsPersonCardItem = {
    member: Member
}

const PersonCardItem: React.FC<PropsPersonCardItem> = (props: PropsPersonCardItem) => {

    const resolveRoleOfMember = (): string => {
        switch (props.member.role) {
            case "ACCOUNT-COMMISSIONER": return "Commissaire au compte"
            case "NORMAL-USER": return "Membre simple"
            case "PRESIDENT": return "President"
            case "SECRETARY": return "Secretaire"
            case "CENSOR": return "Censeur"
            case "TREASURY-OFFICER": return "Tresorrier"
            default: return "Membre simple"
        }
    }

    const resolveMaritalStatus = (): string => {
        switch (props.member.maritalStatus) {
            case "SINGLE": return "Celibataire"
            case "MARRIED": return "Marié"
            case "DIVORCED": return "Divorcé"
            default: return "--"
        }
    }

    return (
        <PersonCardContainer>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5
                }}
            >
                <Avatar
                    alt={props.member.firstName + " " + props.member.lastName}
                    src={props.member.avatar}
                    children={props.member.avatar === undefined ?
                        props.member?.firstName![0] + "" + props.member?.lastName![0] : null
                    }
                    sx={{ width: 75, height: 75, border: "2px solid grey"}}
                />
                <Box
                    sx={{
                        display: "grid",
                        justifyContent: "start",

                    }}
                >
                    <Typography sx={{fontWeight: 600, fontSize: 18}}>{props.member?.firstName + "  " + props.member?.lastName}</Typography>
                    <Chip
                        label={resolveRoleOfMember()}
                        color="primary"
                        variant="outlined"
                        size={"small"}
                        sx={{justifySelf: "start", fontSize: 11}}
                    />
                </Box>
            </Box>

            <FieldListContainer>
                <FieldContainer>
                    <FielLabel>Statut matrimonial</FielLabel>
                    <Typography>{resolveMaritalStatus()}</Typography>
                </FieldContainer>

                <FieldContainer>
                    <FielLabel>Pays de résidence</FielLabel>
                    <Typography>{props.member.countryOfResidence}</Typography>
                </FieldContainer>

                <FieldContainer>
                    <FielLabel>Numéro de téléphone</FielLabel>
                    <Typography>
                        <Link
                            href={"tel:" + props.member.phoneNumber}
                            sx={{
                                textDecoration: "none",
                                color: "inherit",
                                "&:hover": {
                                    color: "#1976d2",
                                    fontWeight: "bold",
                                    borderRadius: 1,
                                    padding: "2px 5px",
                                    boxShadow: "0 0 3px gray",
                                }
                            }}
                        >
                            {props.member.phoneNumber}
                        </Link>
                    </Typography>
                </FieldContainer>

                <FieldContainer>
                    <FielLabel>Adresse</FielLabel>
                    <Typography>{props.member.address}</Typography>
                </FieldContainer>

                <FieldContainer>
                    <FielLabel>Paypal</FielLabel>
                    <Typography>{props.member.paypal}</Typography>
                </FieldContainer>

                <FieldContainer>
                    <FielLabel>Profession</FielLabel>
                    <Typography>{props.member.profession}</Typography>
                </FieldContainer>

            </FieldListContainer>
        </PersonCardContainer>
    )
}

const PersonListLoadingSkeleton: React.FC = () => {
    return (
        <Box
            sx={{
                display: "grid",
                gap: 3
            }}
        >
            <Typography>Chargement des membres en cours...</Typography>
            <Box sx={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: 3,
                "@media screen and (max-width: 900px)": {
                    gridTemplateColumns: "repeat(1, 1fr)",
                }
            }}>
                {[...Array(5)].map((_, idx) =>
                    <PersonCardContainer key={idx}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5
                            }}
                        >
                            <Skeleton variant={"circular"}>
                                <Avatar />
                            </Skeleton>
                            <Box
                                sx={{
                                    display: "grid",
                                    justifyContent: "start",

                                }}
                            >
                                <Skeleton width="200px">
                                    <Typography sx={{fontWeight: 600, fontSize: 18}}>.</Typography>
                                </Skeleton>
                                <Skeleton width="100px">
                                    <Chip
                                        label={"."}
                                        color="primary"
                                        variant="outlined"
                                        size={"small"}
                                        sx={{justifySelf: "start", fontSize: 11}}
                                    />
                                </Skeleton>
                            </Box>
                        </Box>

                        <FieldListContainer>
                            {[...Array(6)].map((_, idx) =>
                                <FieldContainer key={idx}>
                                    <Skeleton width="50%">
                                        <FielLabel>.</FielLabel>
                                    </Skeleton>
                                    <Skeleton width="100%">
                                        <Typography>.</Typography>
                                    </Skeleton>
                                </FieldContainer>
                            )}
                        </FieldListContainer>
                    </PersonCardContainer>
                )}
            </Box>
        </Box>
    )
}

const PersonCardContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  box-shadow: 0 0 4px gray;
  border-radius: 5px;
  padding: 20px;
`
const FieldListContainer = styled.div`
  display: grid;
  grid-gap: 11px;
`
const FieldContainer = styled.div`
  display: grid;
`
const FielLabel = styled.div`
  font-size: 14px;
  color: gray;
`
