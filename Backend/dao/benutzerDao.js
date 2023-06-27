const helper = require('../helper.js');
const md5 = require('md5');
const PersonDao = require('./personDao.js');

class BenutzerDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        const personDao = new PersonDao(this._conn);

        var sql = 'SELECT * FROM Benutzer WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);

        if (helper.isNull(result.personId)) {
            result.person = null;
        } else {
            result.person = personDao.loadById(result.personId);
        }
        delete result.personId;

        return result;
    }

    loadAll() {
        const personDao = new PersonDao(this._conn);

        var sql = 'SELECT * FROM Benutzer';
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];

        for (var i = 0; i < result.length; i++) {


            if (helper.isNull(result[i].personId)) {
                result[i].person = null;
            } else {
                result[i].person = personDao.loadById(result[i].personId);
            }
            delete result[i].personId;
        }

        return result;
    }

    exists(id) {
        var sql = 'SELECT COUNT(id) AS cnt FROM Benutzer WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }

    isunique(benutzername) {
        var sql = 'SELECT COUNT(id) AS cnt FROM Benutzer WHERE benutzername=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(benutzername);

        if (result.cnt == 0) 
            return true;

        return false;
    }

    hasaccess(benutzername, passwort) {
        const personDao = new PersonDao(this._conn);

        var sql = 'SELECT ID FROM Benutzer WHERE benutzername=? AND passwort=?';
        var statement = this._conn.prepare(sql);
        var params = [benutzername, md5(passwort)];
        var result = statement.get(params);

        if (helper.isUndefined(result)) 
            throw new Error('User has no access');
     
        return this.loadById(result.id);
    }

    create(benutzername = '', passwort = '', personId = null) {
        var sql = 'INSERT INTO Benutzer (benutzername,passwort,personId) VALUES (?,?,?)';
        var statement = this._conn.prepare(sql);
        var params = [benutzername, md5(passwort), personId];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not insert new Record. Data: ' + params);

        return this.loadById(result.lastInsertRowid);
    }

    update(id, benutzername = '', neuespasswort = null, personId = null) {
        
        if (helper.isNull(neuespasswort)) {
            var sql = 'UPDATE Benutzer SET benutzername=?,personId=? WHERE id=?';
            var statement = this._conn.prepare(sql);
            var params = [benutzername, personId, id];
        } else {
            var sql = 'UPDATE Benutzer SET benutzername=?,passwort=?,personId=? WHERE id=?';
            var statement = this._conn.prepare(sql);
            var params = [benutzername, md5(neuespasswort), personId, id];
        }
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not update existing Record. Data: ' + params);

        return this.loadById(id);
    }

    delete(id) {
        try {
            var sql = 'DELETE FROM Benutzer WHERE id=?';
            var statement = this._conn.prepare(sql);
            var result = statement.run(id);

            if (result.changes != 1) 
                throw new Error('Could not delete Record by id=' + id);

            return true;
        } catch (ex) {
            throw new Error('Could not delete Record by id=' + id + '. Reason: ' + ex.message);
        }
    }

    toString() {
        console.log('BenutzerDao [_conn=' + this._conn + ']');
    }
}

module.exports = BenutzerDao;