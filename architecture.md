# WORK IN PROGRESS

# Techstack

## Backend

### Language

- TypeScript

### Framework

- NestJS

### Database

- MongoDB
- Redis

## Poligon (frontend)

### Language

- TypeScript

### Framework

- React

### Core dependencies

- Cesium
- Resium
- MaterialUi

## Mobile

### Language

- TypeScript

### Framework

- React Native

# Architecture

```mermaid
architecture-beta
    group api(cloud)[API]

    service mongoDB(database)[MongoDB] in api
    service redis(database)[Redis] in api
    service server(server)[Server] in api

    mongoDB:B -- T:server
    redis:T -- R:server

```

```mermaid
erDiagram
    USER {
        string _id
        string firstName
        string lastName
        string nickName
        number age
        number height
        string avatarBase64
    }
    GAME {
        string _id
        string codeToJoin
        boolean isGameStarted
        string mode
        number createdAt
        Player[] players
    }
    PLAYER {
        string user
        string status
        string class
        string rank
        string team
    }
    STATS {
        string _id
        string player
        string game
        number timestamp
        number bloodPressure
        number bullets
        number health
        Position position
    }
    Position {
        number x
        number y
        number z
    }

    GAME ||--o{ PLAYER : "has"
    PLAYER ||--o{ USER: "has"
    PLAYER ||--o{ STATS : "has"
    GAME ||--o{ STATS : "has"
    STATS ||--o{ Position : "has"
```

```mermaid
flowchart
    A --> B
```
